# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField
from django.db import models

# Create your models here.
class Dataset(models.Model):
  name = models.TextField()
  created_at = models.DateTimeField(auto_now=True)

class Data(models.Model):
  file = models.FileField()
  created_at = models.DateTimeField(auto_now=True)
  dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
  graph = JSONField(null=True, blank=True)
  kind= models.TextField(null=True, blank=True)

class Node(models.Model):
  nid = models.TextField()
  label = models.TextField()
  type = models.TextField()
  data = models.ForeignKey(Data, on_delete=models.CASCADE)

class Edge(models.Model):
  from_node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='source')
  to_node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='dest')
  title = models.TextField()




