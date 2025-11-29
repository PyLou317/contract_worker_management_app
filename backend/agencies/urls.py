from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('agencies/', AgencyListViewAPI.as_view()),
    path('agencies/<int:pk>/', AgencyDetailUpdateViewAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)