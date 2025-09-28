from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *

# Create your views here.
class SchedulingListViewAPI(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Schedule.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Schedule.objects.none()

        queryset = super().get_queryset().filter(organization=user_organization)
        return queryset
    

class ShiftListViewAPI(generics.ListCreateAPIView):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Schedule.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Schedule.objects.none()

        queryset = super().get_queryset().filter(schedule__organization=user_organization)
        return queryset
    

class AreaListViewAPI(generics.ListCreateAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Area.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Area.objects.none()

        queryset = super().get_queryset().filter(schedules__organization=user_organization).distinct()
        return queryset
    

class ManagerListViewAPI(generics.ListCreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Manager.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Manager.objects.none()

        queryset = super().get_queryset().filter(created_schedules__organization=user_organization).distinct()
        return queryset