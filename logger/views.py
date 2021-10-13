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


from .models import Log, Muscle, Routine, User, Exercise, Set
from django.db import IntegrityError
# Create your views here.

METHODS = (
	("car", "Cardio"),
	("wgt", "Strength Training")
)

ROUTINE_TYPES = (
		("wl", "Weight-Loss"),
		("bb", "Bodybuilding")
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
	# Get the exercises that the user has created or added.
	# exercises = Exercise.objects.filter(user=user).order_by('name').all()
	exercises = Exercise.objects.filter(users=user).order_by('name').all()
	pre_exercises = Exercise.objects.filter(category="server").exclude(users=user).order_by('name').all()
	muscles = Muscle.objects.order_by('name').all()

	return render(request, "logger/exercises.html", {
		"exercises": exercises,
		"methods": METHODS,
		"pre_exercises": pre_exercises,
		"muscles": muscles
	})

# This view adds a new custom exercise to database
@login_required
def new_exercise(request):
	if request.method == "POST":
		user = request.user
		name = request.POST['name']
		method = request.POST['method']
		muscle_id = request.POST['muscle']
		muscle = Muscle.objects.get(pk=muscle_id)
		exercise = Exercise(name=name, method=method, category='user', muscle=muscle)
		exercise.save()
		exercise.users.add(user)
		return HttpResponseRedirect(reverse("exercises"))

# Add premade exercise to users list
@login_required
def pre_exercise(request):
	if request.method == "POST":
		user = request.user
		exercise_id = request.POST['exercise']
		exercise = Exercise.objects.get(pk=exercise_id)
		exercise.users.add(user)
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


# Graph page for specific exercise
@login_required
def graph(request, exercise_id):
	exercise = Exercise.objects.get(pk=exercise_id)
	return render(request, "logger/graph.html", {
		"exercise": exercise
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

	return JsonResponse({"url": url}, status=201,)

@login_required
def history(request, exercise_id):
	exercise = Exercise.objects.get(pk=exercise_id)
	logs = Log.objects.filter(exercise=exercise, user=request.user).order_by('-date', '-time').all()
	sets = []
	for log in logs:
		log_sets = log.set_set.all()
		sets.append(log_sets)

	return render(request, "logger/history.html", {
		"exercise": exercise,
		"logs": logs,
		"sets": sets
	})

@login_required
def journal(request):
	return render(request, "logger/journal.html")


# Disabled this view in first version of the app
# @login_required
# def settings(request):
# 	return render(request, "logger/settings.html")


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


# @login_required
# def routines(request):
# 	return render(request, "logger/routines.html")


@login_required
# Create an api view that returns all the notes for a user for a specific month
def get_journal(request, month, year):
	# date_object = datetime.strptime().date()
	logs = Log.objects.filter(user=request.user, date__year=year, date__month=month).all()
	return JsonResponse([log.serialize() for log in logs], safe=False, status=201)


@login_required
def routines(request):

	user = request.user
	routines = Routine.objects.filter(users=user).order_by('name').all()
	pre_routines = Routine.objects.filter(category="server").exclude(users=user).order_by('name').all()

	return render(request, "logger/routines.html", {
		"routines": routines,
		"routine_types": ROUTINE_TYPES,
		"pre_routines": pre_routines
	})

# This view adds a new custom routine to database
@login_required
def new_routine(request):
	if request.method == "POST":
		user = request.user
		name = request.POST['name']
		routine_type = request.POST['routine_type']
		description = request.POST['description']
		routine = Routine(name=name, category='user', type=routine_type, description=description)
		routine.save()
		routine.users.add(user)
		return HttpResponseRedirect(reverse("routines"))

# Add premade routine to users list
@login_required
def add_routine(request):
	if request.method == "POST":
		user = request.user
		routine_id= request.POST['routine']
		routine = Routine.objects.get(pk=routine_id)
		routine.users.add(user)
		return HttpResponseRedirect(reverse("routines"))


# view specific routine
@login_required
def routine(request, routine_id):
	user = request.user
	routine = Routine.objects.get(pk=routine_id)
	exercises = Exercise.objects.filter(routine = routine)
	unregistered_exercises = Exercise.objects.filter(users=user).exclude(routine=routine).all()
	print(unregistered_exercises)
	return render(request, "logger/routine.html", {
		"routine": routine,
		"exercises": exercises,
		"unregistered_exercises": unregistered_exercises
	})

login_required
def add_routine_exercise(request, routine_id):
	routine = Routine.objects.get(pk=routine_id)
	if routine.category == 'user':
		exercise_id = request.POST['exercise']
		exercise = Exercise.objects.get(pk=exercise_id)
		routine.exercises.add(exercise)
		return HttpResponseRedirect(reverse("routine", args=(routine_id, )))
