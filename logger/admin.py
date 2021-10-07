from django.contrib import admin

from .models import User, Exercise, Log
# Register your models here.

admin.site.register(User)
admin.site.register(Exercise)
admin.site.register(Log)
