# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2019-02-10 16:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datastore', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataset',
            name='created_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
