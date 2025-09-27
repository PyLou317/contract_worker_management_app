from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework import permissions
from .models import *
from .serializers import *

# Create your views here.
class RatingListViewAPI(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]