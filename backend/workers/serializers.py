from rest_framework import serializers
from .models import *
from agencies.models import StaffingAgency as Agency
from organizations.models import WarehouseBusiness as Contract
from ratings.models import Rating
from ratings.serializers import RatingSerializer


class AgencyNameField(serializers.CharField):
    def to_representation(self, value):
        return value.name
    
class SkillSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Skill
        fields = ('id',
                  'skill_name',
                  'abreviation',
                  'base_color',
                  'description',
                  'organization',
                  )
        read_only_fields = ['organization']
        

class WorkerSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer()
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = WorkerSkill
        fields = ('id',
                  'skill',
                  'certification_date',
                  'expiration_date',
                  'is_active',
                  'level',
                  )
        
    
class ContractWorkerSerializer(serializers.ModelSerializer):
    rating = RatingSerializer(required=False)
    worker_skills = WorkerSkillSerializer(many=True, required=False)
    agency_details = serializers.SerializerMethodField()
    
    class Meta:
        model = ContractWorker
        fields = (
            'id',
            'first_name',
            'last_name', 
            'email', 
            'phone_number', 
            'current_contract',
            'agency_details',
            'position', 
            'rating',
            'worker_skills',
            'agency',
            'position'
            )
       
        read_only_fields = ('current_contract',)
    
        
    def get_agency_details(self, obj):
        return obj.agency.name
    
    def get_position(self, obj):
        return obj.get_position_display()
        
    def get_average_rating(self, obj):
        rating = obj.rating.all()
        if rating:
            total_score = sum(rating.get_average_score() for rating in rating)
            return total_score / rating.count()
        return 0
    
    
    def create(self, validated_data):
        # print("Agency Name:", agency_id)
       
        try:
            agency_obj = validated_data.pop('agency')
            # agency_obj = Agency.objects.get(id=agency_id)
        except Agency.DoesNotExist:
            raise serializers.ValidationError(
                {"agency": "Agency with this name does not exist."}
            )
        
        worker = ContractWorker.objects.create(
            agency=agency_obj, 
            **validated_data
            )
        
        return worker


    def update(self, instance, validated_data):
        rating_data = validated_data.pop('rating', None)
        worker_skills_data = validated_data.pop('worker_skills', None)
        
        # 1. Update fields on the parent ContractWorker instance
        instance = super().update(instance, validated_data)
        
        # 2. Update Rating
        if rating_data is not None:
            rating_instance = instance.rating
            for attr, value in rating_data.items():
                setattr(rating_instance, attr, value)
            rating_instance.save()
            
            
        # 3. Update Worker Skills
        if worker_skills_data is not None:
            existing_worker_skills = instance.worker_skills.all()
            existing_map = {ws.id: ws for ws in existing_worker_skills}
            skills_to_keep_ids = []

            for item_data in worker_skills_data:
                skill_details = item_data.pop('skill')
                worker_skill_id = item_data.get('id', None)
                skill_id = skill_details.get('id', None)
                
                if skill_id is None:
                 raise serializers.ValidationError("Skill data must include the 'id' of the Skill.")
             
                try:
                    skill_instance = Skill.objects.get(id=skill_id)
                    
                    for attr, value in skill_details.items():
                        if attr == 'id':
                            setattr(skill_instance, attr, value)
                    skill_instance.save()
                
                except Skill.DoesNotExist:
                    raise serializers.ValidationError(f"Skill with the id: {skill_id}, does not exist.")

                
                if worker_skill_id in existing_map:
                    worker_skill_instance = existing_map[worker_skill_id]
                    skills_to_keep_ids.append(worker_skill_id)
                    
                    for attr, value in item_data.items():
                        setattr(worker_skill_instance, attr, value)
                        
                    worker_skill_instance.skill = skill_instance
                    worker_skill_instance.save()
                    
                else:
                    if WorkerSkill.objects.filter(worker=instance, skill=skill_instance).exists():
                         raise serializers.ValidationError(
                             f"Worker already has the skill: {worker_skill_id}. Please provide the 'id' field to update it."
                         )
                         
                    worker_skill_instance = WorkerSkill(
                        worker=instance,
                        skill=skill_instance,
                        **item_data
                    )
                    worker_skill_instance.save()
                    skills_to_keep_ids.append(worker_skill_instance.id)

            ids_to_remove = set(existing_map.keys()) - set(skills_to_keep_ids)
            WorkerSkill.objects.filter(id__in=ids_to_remove).delete()  

        return instance

        