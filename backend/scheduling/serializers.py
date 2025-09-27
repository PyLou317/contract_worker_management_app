from rest_framework import serializers
from .models import *

class SchedulingSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format='%Y-%m-%d')
    end_date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = Schedule
        fields = [
            'id', 
            'organization', 
            'manager', 
            'area', 
            'start_date', 
            'end_date', 
            'is_published'
        ]
        depth = 1
        

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 2


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'
        
        
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'
        