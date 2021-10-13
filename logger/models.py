from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import DateField
from datetime import date
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# # Create your models here.



class User(AbstractUser):
	pass

class Exercise(models.Model):
	METHODS = (
		("car", "Cardio"),
		("wgt", "Strength Training")
	)

	CATEGORIES = (
		("user", "Custom"),
		("server", "Pre-made")
	)

	name = models.CharField(max_length=120)
	# user = models.ForeignKey(User, on_delete=models.CASCADE)
	users = models.ManyToManyField(User, blank=True, null=True)
	# make a table of all the muscles maybe make a many to many field
	muscle = models.ForeignKey('Muscle', blank=True, null=True, on_delete=models.CASCADE)
	method = models.CharField(max_length=4, choices=METHODS, default="wgt")
	category = models.CharField(max_length=7, choices=CATEGORIES, default="user")
	# maybe have a list of equipments this exercise might need. maybe a many to many field for equipment
	# equipment = models.ForeignKey
	# category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return f"{self.name}"

class Set(models.Model):
	UNITS = (
		("lb", "pounds"),
		("kg", "kilograms")
	)

	weight = models.DecimalField(max_digits=10, decimal_places=2)
	reps = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
	units = models.CharField(max_length=3, choices=UNITS, default="lb")
	log = models.ForeignKey("Log", on_delete=models.CASCADE, null=True, blank=True)

	def __str__(self):
		return f"{self.log.exercise.name}: {self.reps} reps"

	def serialize(self):
		return {
			"log": self.log.id,
			"weight": self.weight,
			"reps": self.reps,
			"units": self.units
		}

class Log(models.Model):
	exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
	date = models.DateField(default=date.today)
	time = models.TimeField(default=timezone.now)
	notes = models.TextField(blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	# set = models.ForeignKey(Set, on_delete=models.CASCADE, null=True, blank=True)

	def __str__(self):
		return f"{self.exercise.name}: {self.date} @ {self.time}"

	def serialize(self):
		return {
			"id": self.id,
			"exercise": self.exercise.name,
			"date": self.date,
			"time": self.time,
			"notes": self.notes,
			"username": self.user.username
		}


class Muscle(models.Model):
	name = models.CharField(max_length=120)

	def __str__(self):
		return f"{self.name}"


class Routine(models.Model):
	ROUTINE_TYPES = (
		("wl", "Weight-Loss"),
		("bb", "Bodybuilding")
	)

	CATEGORIES = (
		("user", "Custom"),
		("server", "Pre-made")
	)

	name = models.CharField(max_length=300)
	type = models.CharField(max_length=4, choices=ROUTINE_TYPES)
	description = models.TextField(blank=True, null=True)
	category = models.CharField(max_length=7, choices=CATEGORIES, default="user")
	users = models.ManyToManyField(User, blank=True, null=True)
	exercises = models.ManyToManyField(Exercise, blank=True, null=True)

	def __str__(self):
		return f"{self.name}: {self.type}"