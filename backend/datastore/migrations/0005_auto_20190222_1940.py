# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2019-02-22 19:40
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('datastore', '0004_auto_20190222_1907'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='graph',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]
