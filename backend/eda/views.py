# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from datastore.models import Dataset
from eda_utils.eda_utils import EdaUtils
from django.shortcuts import render, get_object_or_404

# Create your views here.
class EdaView(APIView):
  def get(self, request, dataset_id):
    dataset = get_object_or_404(Dataset, pk=dataset_id)
    eda = EdaUtils(dataset.id)
    eda.import_data()
    k = 10
    res = {
      'graph_properties': eda.graph_properties(),
      'top_k_event_slot_types': eda.top_k_event_slot_types(k),
      'top_k_rel_slot_types': eda.top_k_rel_slot_types(k),
      'top_k_relations': eda.top_k_relations(k)
    }
    return Response(res)