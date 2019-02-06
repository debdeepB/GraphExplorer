# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Dataset(models.Model):
  name = models.CharField(max_length=200)

class Data(models.Model):
  file = models.FileField()
  created_at = models.DateTimeField(auto_now=True)
  dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)


