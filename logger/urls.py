from django.urls import path
from . import views
# from .views import LogMonthArchiveView, LogDayArchiveView  
urlpatterns = [
	path("", views.index, name="index"),
	path("login", views.login_view, name="login"),
	path("logout", views.logout_view, name="logout"),
	path("register", views.register, name="register"),
	path("dashboard", views.dashboard, name="dashboard"),
	path("journal/<int:year>/<int:month>/", views.journal, name="journal"),
	# path("journal/<int:year>/<str:month>/", LogMonthArchiveView.as_view(), name="archive_month"),
	path("settngs", views.settings, name="settings"),
	path("routines", views.routines, name="routines"),
	path("calendar_day/<int:year>/<int:month>/<int:day>", views.calendar_day, name="calendar_day"),
	path("day/<int:year>/<int:month>/<int:day>/", views.day, name="day"),
	# path("day/<int:year>/<str:month>/<int:day>/", LogDayArchiveView.as_view(), name="archive_day"),
	# path('<int:year>/<str:month>/<int:day>/', LogDayArchiveView.as_view(), name="log_day"),
	path("exercises", views.exercises, name="exercises"),
	path("new_exercise", views.new_exercise, name="new_exercise"),
	path("exercise/<int:exercise_id>", views.exercise, name="exercise"),
	path("exercise/<int:exercise_id>/add", views.add_log, name="add_log"), # API url
	path("exercise/<int:exercise_id>/history", views.history, name="history")
]