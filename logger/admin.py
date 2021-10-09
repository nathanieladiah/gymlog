from django.contrib import admin

from .models import User, Exercise, Log, Set
# Register your models here.

admin.site.register(User)
admin.site.register(Exercise)
admin.site.register(Log)
admin.site.register(Set)
