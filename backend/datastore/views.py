# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import DatasetSerializer
from .models import Dataset
from rest_framework.response import Response
from eda.eda_utils import EdaUtils

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
    for f in request.FILES.getlist('file'):
      dataset.data_set.create(file=f)
    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)

  def destroy(self, request, pk=None):
    dataset = Dataset.objects.get(pk=pk)
    serializer = DatasetSerializer(dataset)
    serializer_data = serializer.data
    dataset.delete()
    return Response(serializer_data)
  
# TODO make it async later and move this to another app
class Eda(APIView):
  def get(self, request, dataset_id):
    dataset = get_object_or_404(Dataset, pk=dataset_id)
    eda = EdaUtils(dataset.id)
    k = 10
    res = {
      'graph_properties': eda.graph_properties(),
      'top_k_event_slot_types': eda.top_k_event_slot_types(k),
      'top_k_rel_slot_types': eda.top_k_rel_slot_types(k),
      'top_k_relations': eda.top_k_relations(k)
    }
    return Response(res)

  



