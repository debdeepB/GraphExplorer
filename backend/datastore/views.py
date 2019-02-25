# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import DatasetSerializer
from .models import Dataset, Data, Node, Edge
from rest_framework.response import Response
from eda.eda_utils.eda_utils import EdaUtils
import json

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
      ds = dataset.data_set.create(file=f)
      eda = EdaUtils(dataset.id)
      eda.import_data()
      json_data, node_id_map= eda.convert_to_networkx_json()
      for edge in json_data["links"]:
        source_id = edge["source"]
        target_id = edge["target"]
        edge_relation = edge["edge_relation"]

        source_node = node_id_map[source_id]
        target_node = node_id_map[target_id]

        source, created = Node.objects.get_or_create(data_id=ds.id, nid=source_node["node_id"], defaults={
          'label': source_node["node_text"],
          'type': source_node["node_type"]
        })
        target, created = Node.objects.get_or_create(data_id=ds.id, nid=target_node["node_id"], defaults={
          'label': source_node["node_text"],
          'type': source_node["node_type"]
        })
        Edge.objects.create(from_node=source, to_node=target, title=edge_relation)
      
      ds.graph = json.dumps(json_data)
      ds.save()
    
    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)

  def destroy(self, request, pk=None):
    dataset = Dataset.objects.get(pk=pk)
    serializer = DatasetSerializer(dataset)
    serializer_data = serializer.data
    dataset.delete()
    return Response(serializer_data)
  



