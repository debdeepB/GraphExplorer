"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from datastore.views import DatasetView, SearchNodeView, NeighborView, SearchNeighborView, Hypotheses, Scorer
from eda.views import EdaView

router = routers.DefaultRouter()
router.register(r'datasets', DatasetView, 'dataset')

urlpatterns = [
    url('admin/', admin.site.urls),
    url('api/', include(router.urls)),
    url('api/eda/(?P<dataset_id>[0-9]+)/$', EdaView.as_view()),
    url('api/search/(?P<data_id>[0-9]+)/', SearchNodeView.as_view()),
    url('api/getneighbors/(?P<node_id>[0-9]+)/', NeighborView.as_view()),
    url('api/searchneighbors/', SearchNeighborView.as_view()),
    url('api/hypotheses/(?P<dataset_id>[0-9]+)/$', Hypotheses.as_view()),
    url('api/scorer/$', Scorer.as_view())
]
