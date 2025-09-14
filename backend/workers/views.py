from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from django.db.models import Avg
from .models import *
from .serializers import *

class WorkerListViewAPI(generics.ListCreateAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'agency__name', 'position']
    ordering_fields = ['first_name', 'last_name', 'avg_rating']
    ordering = ['-avg_rating']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.annotate(
            avg_rating=Avg('rating__performance_score')
        )
        
        
class WorkerDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    

class SkillsListViewAPI(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]