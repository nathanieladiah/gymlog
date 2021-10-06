from django.db import models
from django.contrib.auth.models import AbstractUser

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