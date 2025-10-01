from rest_framework import serializers
from .models import *


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
        depth = 2
        
        
class SchedulingSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format='%Y-%m-%d')
    end_date = serializers.DateField(format='%Y-%m-%d')
    shifts = ShiftSerializer(many=True, read_only=True)
    
    class Meta:
        model = Schedule
        fields = [
            'id', 
            'organization', 
            'manager', 
            'area', 
            'start_date', 
            'end_date', 
            'is_published', 
            'shifts'
        ]
        depth = 2
        

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'
        
        
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'
        
        
class CreateScheduleSerializer(serializers.ModelSerializer):
    shifts = ShiftSerializer(many=True)
    area = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Area.objects.all(),
    )
    manager = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Manager.objects.all(),
    )
    
    class Meta:
        model = Schedule
        fields = (
            'id', 
            'organization', 
            'manager', 
            'area', 
            'start_date', 
            'end_date', 
            'is_published', 
            'shifts'
        )
        read_only_fields = ('organization', 'shift') 
    
    def create(self, validated_data):
        shifts_data = validated_data.pop('shifts', [])

        schedule = super().create(validated_data)         
        
        for shift_data in shifts_data:
            if 'id' in shift_data:
                shift_data.pop('id') 
            Shift.objects.create(schedule=schedule, **shift_data)
        
        return schedule