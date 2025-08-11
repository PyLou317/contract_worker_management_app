from rest_framework import serializers
from .models import *

class SchedulingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
        depth = 1
        

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 2
