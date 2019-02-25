from rest_framework import serializers
from .models import Dataset, Node, Edge

class DatasetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Dataset
    fields = ('id','name', 'created_at')

class NodeSerializer(serializers.ModelSerializer):
  title = serializers.CharField(source='nid')
  class Meta:
    model = Node
    fields = ('id','title', 'label', 'type')

class EdgeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Edge
    fields = ('id', 'title', 'from_node_id', 'to_node_id')