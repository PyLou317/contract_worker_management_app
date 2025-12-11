from rest_framework import serializers
from .models import *
from workers.models import ContractWorker as Worker
from workers.serializers import SkillSerializer, WorkerSkillSerializer
from ratings.serializers import RatingSerializer


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'
        
        
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'
        read_only_fields = ('organization',)
        
    def create(self, validated_data):
        request = self.context.get('request', None)
        
        if not request:
            raise serializers.ValidationError({'detail': 'Request context missing for organization assignment.'})
        
        organization = request.user.organization
        
        if not organization:
            raise serializers.ValidationError({'detail': 'You must be associated with an organization to create a manager.'})
        
        validated_data['organization'] = organization
        manager = super().create(validated_data)
        return manager
        

class WorkerSerializer(serializers.ModelSerializer):
    rating = RatingSerializer(required=False)
    worker_skills = WorkerSkillSerializer(many=True, required=False)
    agency_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Worker
        fields = (
            'id', 
            'first_name', 
            'last_name', 
            'email', 
            'phone_number', 
            'current_contract', 
            'agency', 
            'agency_details', 
            'position', 
            'rating', 
            'worker_skills'
        )
        
    def get_agency_details(self, obj):
        return obj.agency.name
        

class WorkerIdSerializer(serializers.Serializer):
    """Serializer used only for receiving worker IDs in nested updates."""
    id = serializers.IntegerField() 
    
    
class ShiftSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False,read_only=False) 
    workers_needed = serializers.IntegerField(required=False, min_value=1)
    contract_workers = WorkerIdSerializer(
        many=True,
        write_only=True,
        required=False,
    )
    workers = WorkerSerializer(
        many=True,
        read_only=True,
        source='contract_workers'
    )
     
    class Meta:
        model = Shift
        fields = (
            'id',
            'workers_needed', 
            'date', 
            'start_time', 
            'end_time', 
            'contract_workers', 
            'workers'
          )
        read_only_fields = ('schedule',)
        
    def update(self, instance, validated_data):
        contract_workers_data = validated_data.pop('contract_workers', None)
        
        instance = super().update(instance, validated_data)
        
        if contract_workers_data is not None:
            worker_ids = [item['id'] for item in contract_workers_data]
            workers = Worker.objects.filter(pk__in=worker_ids)
            instance.contract_workers.set(workers)

        return instance
    
    def create(self, validated_data):
        contract_workers_data = validated_data.pop('contract_workers', None)
        
        shift = super().create(validated_data)
        
        if contract_workers_data is not None:
            workers_ids = [item['id'] for item in contract_workers_data]
            workers = Worker.objects.filter(pk__in=workers_ids)
            shift.contract_workers.set(workers)
        
        return shift
        
        
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
        for shift in existing_shifts.values():
            print(shift)
        
        for shift_item in shifts_data:
            shift_id = shift_item.get('id')
            
            # Update Logic
            if shift_id in existing_shifts:
                shift_instance = existing_shifts.pop(shift_id)
                
                nested_serializer = ShiftSerializer(
                    instance=shift_instance, 
                    data=shift_item, 
                    partial=True
                )
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
            
            # Create Logic
            else:
                new_shift = ShiftSerializer(data=shift_item, partial=True)
                new_shift.is_valid(raise_exception=True)
                new_shift.save(schedule=instance)
        
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
    

# class ScheduledWorkersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Shift
#         fields = ('contract_workers')