from rest_framework import serializers
from .models import *


class ShiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False,read_only=False) 
    workers_needed = serializers.IntegerField(required=False, min_value=1)
     
    class Meta:
        model = Shift
        fields = ('id', 'workers_needed', 'date', 'start_time', 'end_time')
        read_only_fields = ('schedule',)


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'
        
        
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'
        
        
class SchedulingSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format='%Y-%m-%d')
    end_date = serializers.DateField(format='%Y-%m-%d')
    shifts = ShiftSerializer(many=True, required=False)
    
    manager = serializers.PrimaryKeyRelatedField(
        queryset=Manager.objects.all(), # Replace Manager with your actual model name
        write_only=True, 
        required=False
    )
    
    manager_detail = ManagerSerializer(source='manager', read_only=True)
    
    area = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(), # Replace Area with your actual model name
        write_only=True,
        required=False
    )
    
    area_detail = AreaSerializer(source='area', read_only=True)
    
    class Meta:
        model = Schedule
        fields = [
            'id', 
            'organization', 
            'manager',
            'manager_detail', 
            'area', 
            'area_detail',
            'start_date', 
            'end_date', 
            'is_published', 
            'shifts'
        ]
        
        
    def update(self, instance, validated_data):
        shifts_data = validated_data.pop('shifts', [])

        instance = super().update(instance, validated_data)
        
        existing_shifts = {shift.id: shift for shift in instance.shifts.all()}
        
        for shift_item in shifts_data:
            shift_id = shift_item.get('id')
            
            # Check if this shift already exists (it should, as you're editing)
            if shift_id in existing_shifts:
                shift_instance = existing_shifts.pop(shift_id)
                
                # Update the shift instance using the ShiftSerializer
                nested_serializer = ShiftSerializer(
                    instance=shift_instance, 
                    data=shift_item, 
                    partial=True # Allow partial update
                )
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
        
        return instance 
    
        
        
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