# Generated by Django 3.2.8 on 2021-10-12 21:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logger', '0004_auto_20211012_1718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='users',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]