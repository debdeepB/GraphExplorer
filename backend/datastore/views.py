# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DatasetSerializer
from .models import Dataset

# Create your views here.
class DatasetView(viewsets.ModelViewSet):
  serializer_class = DatasetSerializer
  queryset = Dataset.objects.all()
