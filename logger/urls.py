from django.urls import path
from . import views

urlpatterns = [
	path("", views.index, name="index"),
	path("login", views.login_view, name="login"),
	path("logout", views.logout_view, name="logout"),
	path("register", views.register, name="register"),
	path("dashboard", views.dashboard, name="dashboard"),
	path("exercises", views.exercises, name="exercises"),
	path("new_exercise", views.new_exercise, name="new_exercise"),
	path("exercise/<int:exercise_id>", views.exercise, name="exercise"),
	path("exercise/<int:exercise_id>/add", views.add_log, name="add_log"),
	path("exercise/<int:exercise_id>/history", views.history, name="history")
]