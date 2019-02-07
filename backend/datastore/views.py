# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import DatasetSerializer
from .models import Dataset
from rest_framework.response import Response

# Create your views here.
class DatasetView(viewsets.ViewSet):

  def list(self, request):
    queryset = Dataset.objects.all()
    serializer = DatasetSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    queryset = Dataset.objects.all()
    dataset = get_object_or_404(queryset, pk=pk)
    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)

  def create(self, request):
    dataset = Dataset.objects.create(name=request.data.get("name"))
    dataset.save()
    # save files
    print request.data
    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)
  



