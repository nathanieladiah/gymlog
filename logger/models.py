from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import DateField
from datetime import date
from django.utils import timezone

# Create your models here.
METHODS = (
	("car", "Cardio"),
	("wgt", "Strength Training")
)


class User(AbstractUser):
	pass

class Exercise(models.Model):

	name = models.CharField(max_length=120)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	# make a table of all the muscles maybe make a many to many field
	# muscle = models.ForeignKey(Muscle, max_length=120, blank=True, null=True)
	method = models.CharField(max_length=4, choices=METHODS, default="wgt")
	# maybe have a list of equipments this exercise might need. maybe a many to many field for equipment
	# equipment = models.ForeignKey
	# category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return f"{self.name}"

class Log(models.Model):
	UNITS = (
		("lb", "pounds"),
		("kg", "kilograms")
	)
	exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
	date = models.DateField(default=date.today)
	time = models.TimeField(default=timezone.now)
	reps = models.IntegerField()
	weight = models.IntegerField()
	unit = models.CharField(max_length=3, choices=UNITS, default="lb")
	notes = models.TextField(blank=True, null=True)

	def __str__(self):
		return f"{self.exercise.name}: {self.reps} reps @ {self.weight}"