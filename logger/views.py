from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse


from .models import User, Exercise
from django.db import IntegrityError
# Create your views here.

METHODS = (
	("car", "Cardio"),
	("wgt", "Strength Training")
)

def index(request):
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


def dashboard(request):
	return render(request, "logger/dashboard.html")

@login_required
def exercises(request):

	user = request.user
	# Get the exercises that the user has created.
	exercises = Exercise.objects.filter(user=user).all()

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


@login_required
def exercise(request, exercise_id):
	exercise = Exercise.objects.get(pk=exercise_id)
	return render(request, "logger/exercise.html", {
		"exercise": exercise
	})