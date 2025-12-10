from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import StaffingAgency
from .serializers import StaffingAgencySerializer


class AgencyListViewAPI(generics.ListCreateAPIView):
    queryset = StaffingAgency.objects.all()
    serializer_class = StaffingAgencySerializer
    permission_classes = [permissions.IsAuthenticated]


class AgencyDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = StaffingAgency.objects.all()
    serializer_class = StaffingAgencySerializer
    permission_classes = [permissions.IsAuthenticated]