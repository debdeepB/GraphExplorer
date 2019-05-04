from backend.settings import BASE_DIR
from datastore.models import Dataset
import pandas as pd
import csv
import networkx as nx
import json
from networkx.readwrite import json_graph
from random import *

class EdaUtils:
  def __init__(self, dataset_id):
    self.dataset = Dataset.objects.get(pk=dataset_id)

  def import_data(self):
    aida_edges_file = BASE_DIR + self.dataset.data_set.get(kind="kb").file.url
    self.aida_edges = pd.read_csv(aida_edges_file, sep="\t", quoting=csv.QUOTE_NONE)
  
  def graph_properties(self):
    return {
      'num_unique_entities': len(self.aida_edges.entity_id.unique()),
      'num_unique_relations': len(self.aida_edges.event_relation_id.unique()),
      'num_uniq_provenance': len(self.aida_edges.event_relation_provenance.unique()),
      'num_kb_ids': len(self.aida_edges.entity_id.unique()),
    }
  
  def top_k_event_slot_types(self, k):
    return self.aida_edges[['event_relation_type']].groupby('event_relation_type').size().nlargest(k).to_dict()

  def top_k_rel_slot_types(self, k):
    return self.aida_edges[['entity_type']].groupby('entity_type').size().nlargest(k).to_dict()
  
  def top_k_relations(self, k):
    k = 3
    return self.aida_edges[['event_relation_id']].groupby('event_relation_id').size().nlargest(k).to_dict()

  def convert_to_networkx_json(self):
    G = nx.MultiGraph()
    node_map = {}
    node_id_map = {}

    for index, row in self.aida_edges.iterrows():
      node_id_1 = row['event_relation_mention_id']
      node_id_2 = row['entity_mention_id']
      if node_id_1 not in node_map:
          node_map[node_id_1] = len(node_map)
          node_id_map[node_map[node_id_1]] = {}
      if node_id_2 not in node_map:
          node_map[node_id_2] = len(node_map)
          node_id_map[node_map[node_id_2]] = {}
      if not G.has_node(node_map[node_id_1]):
          # event info
          node_id_map[node_map[node_id_1]]["node_id"] = node_id_1
          node_id_map[node_map[node_id_1]]["node_text"] = row['event_relation_type'] + row['event_relation_subtype']
          node_id_map[node_map[node_id_1]]["node_type"] = "event"
          G.add_node(node_map[node_id_1], node_id=node_id_1, node_text=row['event_relation_type'] + row['event_relation_subtype'], node_type="event")
          # entity info
      if not G.has_node(node_map[node_id_2]):
          node_id_map[node_map[node_id_2]]["node_id"] = node_id_2
          node_id_map[node_map[node_id_2]]["node_text"] = row['entity_string']
          node_id_map[node_map[node_id_2]]["node_type"] = "entity"
          G.add_node(node_map[node_id_2], node_id=node_id_2, node_text=row['entity_string'], node_type="entity")

      G.add_edge(node_map[node_id_1], node_map[node_id_2],
                edge_relation=row['event_relation_arg_role'])
        
    json_data = json_graph.node_link_data(G)
    return json_data, node_id_map

from pylev import levenshtein
node_threshold = 10.0
edge_threshold = 1000.0

def graph_similarity(mined_hyps, target_hyps):
  
  mined_graphs = []
  target_graphs = []
  
  for mined_hyp in mined_hyps:
    mined_graphs.append(json_graph.node_link_graph(mined_hyp))

  for target_hyp in target_hyps:
    target_graphs.append(json_graph.node_link_graph(target_hyp))

  result = []
  for i in range(len(mined_graphs)):
    min_score = float('inf')
    best = -1
    for j in range(len(target_graphs)):
        score = randint(10,30)
        if (score < min_score):
            min_score = score
            best = j
    result.append([i, best, min_score])
        
  return result

