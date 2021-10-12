from django.urls import path, re_path
from . import views
# from .views import LogMonthArchiveView, LogDayArchiveView  
urlpatterns = [
	path("", views.index, name="index"),
	# Auth views:
	path("login", views.login_view, name="login"),
	path("logout", views.logout_view, name="logout"),
	path("register", views.register, name="register"),
	
	# utility views
	path("dashboard", views.dashboard, name="dashboard"), # call this calendar maybe?
	path("journal", views.journal, name="journal"),
	path("settngs", views.settings, name="settings"),
	path("routines", views.routines, name="routines"),
	
	# TODO: start url with name of exercise instead of 'exercise'
	# Exercise list / history / views
	path("exercises", views.exercises, name="exercises"),
	path("new_exercise", views.new_exercise, name="new_exercise"),
	path("exercise/<int:exercise_id>", views.exercise, name="exercise"),
	path("exercise/<int:exercise_id>/graph", views.graph, name="graph"),
	path("exercise/<int:exercise_id>/history", views.history, name="history"),

	# API views
	path("exercise/<int:exercise_id>/add", views.add_log, name="add_log"), # API url
	path("day/<date_string>", views.display_day, name="display_day"), # API url
	path("journal/<month>/<year>", views.get_journal, name="load_journal")
]