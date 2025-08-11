from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *

# Create your views here.
class ContractWorkerListViewAPI(generics.ListCreateAPIView):
    queryset = ContractWorker.objects.all()
    serializer_class = ContractWorkerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]