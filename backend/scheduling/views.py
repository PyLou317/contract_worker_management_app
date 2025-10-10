from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class SchedulingListViewAPI(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Shift.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Shift.objects.none()

        queryset = super().get_queryset().filter(schedule__organization=user_organization)
        return queryset
    

class AreaListViewAPI(generics.ListCreateAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Area.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Area.objects.none()

        queryset = super().get_queryset().filter(organization=user_organization).distinct()
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

        queryset = super().get_queryset().filter(organization=user_organization).distinct()
        return queryset
    

class CreateScheduleView(generics.CreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = CreateScheduleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        print(self.request.data)
        user = self.request.user
        user_organization = getattr(user, 'organization', None)
        
        area = self.request.data.get('area')
        area_instance = Area.objects.get(name=area)
        
        manager = self.request.data.get('manager')
        manager_instnace = Manager.objects.get(name=manager)
        
        if not user_organization:
            raise PermissionDenied("User is not associated with an organization.")
        
        serializer.save(organization=user_organization, area=area_instance, manager=manager_instnace)
        
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Schedule.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Schedule.objects.none()

        queryset = super().get_queryset().filter(schedule__organization=user_organization)
        return queryset
    
    
class ScheduleDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = SchedulingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Schedule.objects.none()

        user_organization = user.organization
        if not user_organization:
            return Schedule.objects.none()

        queryset = super().get_queryset().filter(organization=user_organization)
        return queryset
    
    def perform_update(self, serializer):
        instance = self.get_object()
        user = self.request.user
        user_organization = getattr(user, 'organization', None)
        
        if instance.organization != user_organization:
            raise PermissionDenied("You do not have permission to update this schedule.")
        
        serializer.save()
