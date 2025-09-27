from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from .models import *

# Create your views here.
class ClockInViewAPI(generics.RetrieveUpdateAPIView):
    queryset = TimeKeeping.objects.all()
    serializer_class = TimeKeepingSerializer
    permission_classes = [permissions.IsAuthenticated]