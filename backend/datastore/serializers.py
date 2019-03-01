from rest_framework import serializers
from .models import Dataset, Node, Edge, Data
from rest_framework.serializers import SerializerMethodField

class DataSerializer(serializers.ModelSerializer):
  class Meta:
    model = Data
    fields = ('id', 'file', 'created_at', 'dataset_id')

class DatasetSerializer(serializers.ModelSerializer):
  data = SerializerMethodField()
  class Meta:
    model = Dataset
    fields = ('id','name', 'created_at', 'data')
  
  def get_data(self, obj):
    queryset = obj.data_set.all()
    return DataSerializer(queryset, many=True).data

class NodeSerializer(serializers.ModelSerializer):
  title = serializers.CharField(source='nid')
  class Meta:
    model = Node
    fields = ('id','title', 'label', 'type')

class EdgeSerializer(serializers.ModelSerializer):
  nid1 = SerializerMethodField()
  nid2 = SerializerMethodField()
  class Meta:
    model = Edge
    fields = ('id', 'title', 'from_node_id', 'to_node_id', 'nid1', 'nid2')

  def get_nid1(self, obj):
    return Node.objects.get(pk=obj.from_node_id).nid

  def get_nid2(self, obj):
    return Node.objects.get(pk=obj.to_node_id).nid