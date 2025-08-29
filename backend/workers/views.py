from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from django.db.models import Avg
from .models import *
from .serializers import *

class ContractWorkerListViewAPI(generics.ListCreateAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'agency__name']
    ordering_fields = ['first_name', 'last_name', 'avg_rating']
    ordering = ['first_name']
    
    def get_queryset(self):
        # Annotate the queryset with the average rating.
        queryset = super().get_queryset()
        return queryset.annotate(
            avg_rating=Avg('ratings__performance_score')
        )