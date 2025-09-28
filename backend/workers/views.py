from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from django.db.models import Avg
from .models import *
from .serializers import *
from rest_framework.exceptions import ValidationError 

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
        user_organization = self.request.user.organization
        if not user_organization:
            raise ValidationError({'detail': 'You must be associated with a Warehouse Business to create a worker.'})
        
        serializer.save(current_contract=user_organization) 
        
        
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
        
        queryset = super().get_queryset().filter(organization=user_organiztion)
        return queryset.distinct()
    
    def perform_create(self, serializer):
        user = self.request.user
        user_organiztion = user.organization
        
        if not user_organiztion:
            raise ValidationError({'detail': 'You must be associated with an organization to create a skill.'})
        
        serializer.save(organization=user_organiztion)