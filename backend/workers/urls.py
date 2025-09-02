from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('workers/', ContractWorkerListViewAPI.as_view()),
    path('workers/<int:pk>/', WorkerDetailUpdateViewAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)