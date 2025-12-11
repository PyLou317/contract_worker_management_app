from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import StaffingAgency
from .serializers import StaffingAgencySerializer


class AgencyListViewAPI(generics.ListCreateAPIView):
    queryset = StaffingAgency.objects.all()
    serializer_class = StaffingAgencySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return StaffingAgency.objects.none()
        
        user_organization = user.organization
        if not user_organization:
            return StaffingAgency.objects.none()
        
        queryset = super().get_queryset().filter(organization=user_organization)
        return queryset


class AgencyDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffingAgency.objects.all()
    serializer_class = StaffingAgencySerializer
    permission_classes = [permissions.IsAuthenticated]