from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *

# Create your views here.
class SchedulingListViewAPI(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    

class ShiftListViewAPI(generics.ListCreateAPIView):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]