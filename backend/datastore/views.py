# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from backend.settings import BASE_DIR
import json


from .serializers import DatasetSerializer, NodeSerializer, EdgeSerializer
from .models import Dataset, Data, Node, Edge
from eda.eda_utils.eda_utils import EdaUtils, graph_similarity

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
      if str(f).endswith(".csv"):
        ds = dataset.data_set.create(file=f, kind="kb")
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
            'label': target_node["node_text"],
            'type': target_node["node_type"]
          })
          Edge.objects.create(from_node=source, to_node=target, title=edge_relation)
        
        ds.graph = json.dumps(json_data)
        ds.save()
      elif str(f).endswith(".json"):
        ds = dataset.data_set.create(file=f, kind="hyp")
        ds.save()

    serializer = DatasetSerializer(dataset)
    return Response(serializer.data)

  def destroy(self, request, pk=None):
    dataset = Dataset.objects.get(pk=pk)
    serializer = DatasetSerializer(dataset)
    serializer_data = serializer.data
    dataset.delete()
    return Response(serializer_data)
  
class SearchNodeView(APIView):
  def get(self, request, data_id):
    full_text = request.GET.get('search', '')
    nodes = Node.objects.filter(data_id=data_id).annotate(similarity=TrigramSimilarity('label', full_text)).filter(similarity__gt=0.3).order_by('-similarity')
    serializer = NodeSerializer(nodes, many=True)
    return Response(serializer.data)

class NodeView(APIView):
  def get(self, request, node_id):
    node = Node.objects.get(pk=node_id)
    serializer = NodeSerializer(node)
    return Response(serializer.data)
  
class NeighborView(APIView):
  def get(self, request, node_id):
    node = Node.objects.get(pk=node_id)
    edges = Edge.objects.filter(from_node_id=node.id)
    neighbor_ids = edges.all().values_list('to_node_id', flat=True)
    neighbors = Node.objects.filter(pk__in=neighbor_ids)
    node_serialier = NodeSerializer(neighbors, many=True)
    edge_serializer = EdgeSerializer(edges, many=True)
    data = {
      "nodes": node_serialier.data,
      "edges": edge_serializer.data
    }
    return Response(data)

class SearchNeighborView(APIView):
  def get(self, request):
    node_id = request.GET.get('nid', '')
    node = Node.objects.get(nid=node_id)
    edges = Edge.objects.filter(from_node_id=node.id)
    neighbor_ids = edges.all().values_list('to_node_id', flat=True)
    neighbors = Node.objects.filter(pk__in=neighbor_ids)
    node_serialier = NodeSerializer(neighbors, many=True)
    edge_serializer = EdgeSerializer(edges, many=True)
    data = {
      "nodes": node_serialier.data,
      "edges": edge_serializer.data
    }
    return Response(data)

class Hypotheses(APIView):
  def get(self, request, dataset_id):
    ds = Dataset.objects.get(pk=dataset_id)
    hypotheses = ds.data_set.get(kind="hyp")
    file_url = BASE_DIR + hypotheses.file.url
    with open(file_url) as json_file:
      json_data = json.load(json_file)
    return Response(json_data)


class Scorer(APIView):
  def get(self, request):
    mined_ds_id = request.GET.get('mined', '')
    target_ds_id = request.GET.get('target', '')
    mined_ds = Dataset.objects.get(pk=mined_ds_id)
    target_ds = Dataset.objects.get(pk=target_ds_id)
    mined_hyp = mined_ds.data_set.get(kind="hyp")
    target_hyp = target_ds.data_set.get(kind="hyp")
    with open(BASE_DIR + mined_hyp.file.url) as json_file:
      mined_data = json.load(json_file)
    with open(BASE_DIR + target_hyp.file.url) as json_file:
      target_data = json.load(json_file)
    return Response(graph_similarity(mined_data, target_data))