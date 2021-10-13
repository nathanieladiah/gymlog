from django.contrib import admin

from .models import User, Exercise, Log, Set, Muscle, Routine
# Register your models here.

admin.site.register(User)
admin.site.register(Exercise)
admin.site.register(Log)
admin.site.register(Set)
admin.site.register(Muscle)
admin.site.register(Routine)