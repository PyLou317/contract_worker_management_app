from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *

# Create your views here.
class SchedulingListViewAPI(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class ShiftListViewAPI(generics.ListCreateAPIView):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class AreaListViewAPI(generics.ListCreateAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated]
    

class ManagerListViewAPI(generics.ListCreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [permissions.IsAuthenticated]