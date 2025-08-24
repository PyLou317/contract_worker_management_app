from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from .models import *
from .serializers import *

# Create your views here.
class ContractWorkerListViewAPI(generics.ListCreateAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'agency__name']