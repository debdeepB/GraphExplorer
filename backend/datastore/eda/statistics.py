from backend.settings import BASE_DIR
from datastore.models import Dataset
import pandas as pd
import csv

class EdaUtils:
  def __init__(self, dataset_id):
    self.dataset = Dataset.objects.get(pk=dataset_id)
    self.import_data()
    self.join_data()

  def import_data(self):
    # filter out files
    aida_events_file = BASE_DIR + self.dataset.data_set.filter(file__contains='evt_mentions').first().file.url
    aida_relations_file = BASE_DIR + self.dataset.data_set.filter(file__contains='rel_mentions').first().file.url
    aida_entities_file = BASE_DIR + self.dataset.data_set.filter(file__contains='ent_mentions').first().file.url
    aida_event_slots_file = BASE_DIR + self.dataset.data_set.filter(file__contains='evt_slots').first().file.url
    aida_rel_slots_file = BASE_DIR + self.dataset.data_set.filter(file__contains='rel_slots').first().file.url
    # make pandas dataframe
    self.aida_events = pd.read_csv(aida_events_file, sep="\t", quoting=csv.QUOTE_NONE)
    self.aida_relations = pd.read_csv(aida_relations_file, sep="\t", quoting=csv.QUOTE_NONE)
    self.aida_entities = pd.read_csv(aida_entities_file, sep="\t", quoting=csv.QUOTE_NONE)
    self.aida_event_slots = pd.read_csv(aida_event_slots_file, sep="\t", quoting=csv.QUOTE_NONE)
    self.aida_rel_slots = pd.read_csv(aida_rel_slots_file, sep="\t", quoting=csv.QUOTE_NONE)
  
  def join_data(self):
    self.aida_rel_slots['mention_id'] = self.aida_rel_slots['relationmention_id']
    self.aida_event_slots['mention_id'] = self.aida_event_slots['eventmention_id']
    cols = ['tree_id', 'mention_id', 'slot_type', 'arg_id']
    self.aida_edges = self.aida_event_slots[cols].append(self.aida_rel_slots[cols], sort=False)
    self.aida_edges = pd.merge(self.aida_edges, self.aida_entities, left_on='arg_id', right_on='entity_id', how='left', suffixes=['', '_en'])
    self.aida_edges = pd.merge(self.aida_edges, self.aida_events, left_on='mention_id', right_on='eventmention_id', how='left', suffixes=['', '_ev'])
    self.aida_edges = pd.merge(self.aida_edges, self.aida_relations, left_on='mention_id', right_on='relationmention_id', how='left', suffixes=['', '_re'])

  def graph_properties(self):
    return {
      'num_unique_entities': len(self.aida_entities.entity_id.unique()),
      'num_unique_relations': len(self.aida_relations.relation_id.unique()),
      'num_uniq_provenance': len(self.aida_edges.provenance.unique()),
      'num_kb_ids': len(self.aida_edges.kb_id.unique()),
    }
  
  def top_k_event_slot_types(self, k):
    return self.aida_event_slots[['slot_type']].groupby('slot_type').size().nlargest(k).to_dict()

  def top_k_rel_slot_types(self, k):
    return self.aida_rel_slots[['slot_type']].groupby('slot_type').size().nlargest(k).to_dict()
  
  def top_k_relations(self, k):
    return self.aida_relations[['relation_id']].groupby(['relation_id']).size().nlargest(k).to_dict()
    


  

