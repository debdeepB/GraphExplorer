from backend.settings import BASE_DIR
from datastore.models import Dataset
import pandas as pd
import csv

class EdaUtils:
  def __init__(self, dataset_id):
    self.dataset = Dataset.objects.get(pk=dataset_id)
    self.import_data()

  def import_data(self):
    aida_edges_file = BASE_DIR + self.dataset.data_set.first().file.url
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
    


  

