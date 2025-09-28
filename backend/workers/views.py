from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from django.db.models import Avg
from .models import *
from .serializers import *

class WorkerListViewAPI(generics.ListCreateAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'agency__name', 'position']
    ordering_fields = ['first_name', 'last_name', 'avg_rating']
    ordering = ['-avg_rating']
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return ContractWorker.objects.none()
        
        user_organization = user.organization
        if not user_organization:
            return ContractWorker.objects.none()
        
        queryset = super().get_queryset().filter(current_contract=user_organization)
        return queryset.annotate(
            avg_rating=Avg('rating__performance_score')
        )
    
    def perform_create(self, serializer):
        serializer.save(current_contract=self.request.user.organization) 
        
        
class WorkerDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class SkillsListViewAPI(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Skill.objects.none()
        
        user_organiztion = user.organization
        if not user_organiztion:
            return Skill.objects.none()
        
        queryset = super().get_queryset().filter(worker_skills__worker__current_contract=user_organiztion)
        return queryset.distinct()