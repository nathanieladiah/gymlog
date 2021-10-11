import datetime
from datetime import datetime
import json
from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.urls import reverse
from django.views.generic.dates import DayArchiveView, MonthArchiveView
from django.db.models import Count
from django.utils.decorators import method_decorator


from .models import Log, User, Exercise, Set
from django.db import IntegrityError
# Create your views here.

METHODS = (
	("car", "Cardio"),
	("wgt", "Strength Training")
)

def index(request):
	if request.user.is_authenticated:
		return render(request, "logger/dashboard.html")

	else:
		return render(request, "logger/index.html")


def login_view(request):
	if request.method == "POST":

		# Attempt to sign user in
		username = request.POST["username"]
		password = request.POST["password"]
		user = authenticate(request, username=username, password=password)

		# Check if authentication successful
		if user is not None:
			login(request, user)
			return HttpResponseRedirect(reverse("dashboard"))
		else: 
			return render(request, "logger/login.html", {
				"message": "Invalid username and/or password."
			})

	else:
		return render(request, "logger/login.html")


def logout_view(request):
	logout(request)
	return HttpResponseRedirect(reverse("index"))


def register(request):
	if request.method == "POST":
		username = request.POST["username"]
		email = request.POST["email"]

		# Ensure password matches confirmation
		password = request.POST["password"]
		confirmation = request.POST["confirmation"]
		if password != confirmation:
			return render(request, "logger/register.html", {
				"message": "Passwords must match."
			})

		# Attempt to create new user
		try:
			user = User.objects.create_user(username, email, password)
			user.save()
		except IntegrityError:
			return render(request, "logger/register.html", {
				"message": "Username already taken."
			})
		login(request, user)
		return HttpResponseRedirect(reverse("dashboard"))

	else:
		return render(request, "logger/register.html")


@login_required(login_url='login/')
def dashboard(request):
	return render(request, "logger/calendar.html")

@login_required
def exercises(request):

	user = request.user
	# Get the exercises that the user has created.
	exercises = Exercise.objects.filter(user=user).order_by('name').all()

	return render(request, "logger/exercises.html", {
		"exercises": exercises,
		"methods": METHODS
	})

@login_required
def new_exercise(request):
	if request.method == "POST":
		user = request.user
		name = request.POST['name']
		method = request.POST['method']
		exercise = Exercise(name=name, user=user, method=method)
		exercise.save()
		return HttpResponseRedirect(reverse("exercises"))


# Load page for a specific exercise
@login_required
def exercise(request, exercise_id):
	UNITS = (
		("lb", "pounds"),
		("kg", "kilograms")
	)
	exercise = Exercise.objects.get(pk=exercise_id)
	return render(request, "logger/exercise.html", {
		"exercise": exercise,
		"units": UNITS
	})


# Save sets for a specific exercise
@login_required
def add_log(request, exercise_id):

	UNITS = (
		("lb", "pounds"),
		("kg", "kilograms")
	)

	# Saving a new log has to be done by POST
	if request.method != "POST":
		return JsonResponse({"error": "POST request required."}, status=400)

	# Get details of the logs:
	data = json.loads(request.body)

	exercise = Exercise.objects.get(pk=exercise_id)
	date = data.get("date", "")
	time = data.get("time", "")
	sets = data.get("sets", "")
	notes = data.get("notes", "")
	# print(date, notes, time, sets)

	# Attempt to create a new Log and then add the sets to it
	#TODO put a try and except here
	log = Log(
		date=date,
		time=time,
		notes=notes,
		user=request.user,
		exercise = exercise
	)
	log.save()

	for set in sets:
		new_set = Set(
			weight=set['weight'],
			reps=set['reps'],
			units=set['units']
		)
		new_set.save()
		log.set_set.add(new_set)
	
	url = reverse('exercises')

	return JsonResponse({"message": "Success", "url": url}, status=201,)
	# return HttpResponseRedirect(reverse("exercises"))

@login_required
def history(request, exercise_id):
	exercise = Exercise.objects.get(pk=exercise_id)
	logs = Log.objects.filter(exercise=exercise).order_by('-date', '-time').all()
	# TODO filter this database using the results from database above
	# do for log in logs, and get all the corresponding related fields
	sets = []
	for log in logs:
		log_sets = log.set_set.all()
		sets.append(log_sets)
	# sets = Set.objects.filter()
	print(sets)
	return render(request, "logger/history.html", {
		"exercise": exercise,
		"logs": logs,
		"sets": sets
	})

@login_required
def journal(request, year, month):
	return render(request, "logger/journal.html")

# API view to populate the journal page


# @method_decorator(login_required, name='dispatch')
# class LogMonthArchiveView(MonthArchiveView):
	
# 	queryset = Log.objects.all()
# 	# queryset = (Log.objects
# 	# 	.values('notes', 'date')
# 	# 	.annotate(dcount=Count('date'))
# 	# 	.order_by()
# 	# )
# 	date_field = "date"
# 	allow_future = True
# 	template_name = "logger/journal.html"


@login_required
def day(request, day, month, year):
	# TODO create a datetime object from a string using datetime.strptime()
	# date = 
	# logs = Log.objects.filter(user=request.user).filter(date=date).all()
	logs = Log.objects.filter(user=request.user).all()
	return render(request, "logger/date.html", {
		"logs": logs,
		"day": day,
		"month": month,
		"year":year
		# "date": date
	})

# API view to populate day page
# @login_required
# def day_contents(request, day, month, year):
# 	logs = Log.objects.filter(user=request.user).order_by('-date', '-time').all()
# 	return JsonResponse([log.serialize() for log in logs], safe=False)


# class LogDayArchiveView(DayArchiveView):
# 	queryset = Log.objects.all()
# 	date_field = "date"
# 	allow_future = True
# 	template_name = "logger/date.html"

@login_required
def settings(request):
	return render(request, "logger/settings.html")

@login_required
def routines(request):
	return render(request, "logger/routines.html")

# class LogDayArchiveView(DayArchiveView):
# 	queryset = Log.objects.filter(user=request.user).all()
# 	date_field = "date"
# 	allow_future=True

@login_required
# Take some integers as input and return a url for the corresponding date
def calendar_day(request, day, month, year):
# def calendar_day(request):
	url = reverse('day', args=(year, month, day))
	return JsonResponse({"url": url}, status=201,)



@login_required
# Take some integers as input and return a url for the corresponding date
def day_buttons(request, day1, month1, year1, day, month, year):
	url = reverse('day', args=(year1, month1, day1))
	date_string = f"{day1} {month1} {year1}"
	date_object = datetime.strptime(date_string, "%d %m %Y").date()
	log_list = Log.objects.filter(date=date_object, user=request.user).all()
	logs = {}
	for log in log_list:
		set_list = (log.set_set.all())
		log_info = {}
		sets_perlog = []
		for set in set_list:
			set_serialized = set.serialize()
			sets_perlog.append(set_serialized)
		# sets.append(sets_perlog)
		log_serialized = log.serialize()
		# logs.append(logs_serialized)
		log_info['sets_perlog'] = sets_perlog
		log_info['log_info'] = log_serialized
		logs[f"log: {log.id}"] = log_info
	print(logs)

	return JsonResponse(logs, status=201, safe=False)

@login_required
def display_day(request, date_string):
	date_object = datetime.strptime(date_string, "%d %m %Y").date()
	log_list = Log.objects.filter(date=date_object, user=request.user).all()
	if log_list == None:
		return JsonResponse({"Warning": "No Logs"})
	logs = {}
	for log in log_list:
		set_list = (log.set_set.all())
		log_info = {}
		sets_perlog = []
		for set in set_list:
			set_serialized = set.serialize()
			sets_perlog.append(set_serialized)
		log_serialized = log.serialize()
		log_info['sets_perlog'] = sets_perlog
		log_info['log_info'] = log_serialized
		logs[f"log: {log.id}"] = log_info
	print(date_object)
		
	return JsonResponse(logs, safe=False, status=201)