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
    class Meta:
        model = Skill
        fields = ('id',
                  'skill_name',
                  'abreviation',
                  'base_color',
                  'description',
                  )
        read_only_fields = ['id']
        

class WorkerSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer()
    
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
    position = serializers.SerializerMethodField()
    agency = serializers.CharField(write_only=True)
    
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
            )
        # Makes these fields write only
        extra_kwargs = {
            # 'current_contract': {'write_only': True},
            'position': {'write_only': True}
            }
        read_only_fields = ('current_contract',)
    
        
    def get_agency_details(self, obj):
        return obj.agency.name
    
    def get_position(self, obj):
        return obj.get_position_display()
        
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings:
            total_score = sum(rating.get_average_score() for rating in ratings)
            return total_score / ratings.count()
        return 0
    
    
    def create(self, validated_data):
        agency_name = validated_data.pop('agency')
        # contract_name = validated_data.pop('current_contract')
       
        try:
            agency_obj = Agency.objects.get(name=agency_name)
        except Agency.DoesNotExist:
            raise serializers.ValidationError(
                {"agency": "Agency with this name does not exist."}
            )
        
        # try:
        #     contract_obj = Contract.objects.get(name=contract_name)
        # except Contract.DoesNotExist:
        #     raise serializers.ValidationError(
        #         {"current_contract": "Contract with this name does not exist."}
        #     )
        
        worker = ContractWorker.objects.create(
            agency=agency_obj, 
            # current_contract=contract_obj,
            **validated_data
            )
        
        return worker


    def update(self, instance, validated_data):
        rating_data = validated_data.pop('rating', None)
        worker_skills_data = validated_data.pop('worker_skills', None)
        
        # Check if 'agency' is in validated_data and handle it separately
        agency_name = validated_data.pop('agency', None)
        if agency_name:
            try:
                agency_obj = Agency.objects.get(name=agency_name)
                instance.agency = agency_obj
            except Agency.DoesNotExist:
                raise serializers.ValidationError({"agency": "Agency with this name does not exist."})
                
        # Check for 'current_contract' as well, since it's also a ForeignKey
        contract_name = validated_data.pop('current_contract', None)
        if contract_name:
            try:
                contract_obj = Contract.objects.get(name=contract_name)
                instance.current_contract = contract_obj
            except Contract.DoesNotExist:
                raise serializers.ValidationError({"current_contract": "Contract with this name does not exist."})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        

        if rating_data:
            if hasattr(instance, 'rating'):
                rating_instance = instance.rating
                
                # Update existing rating
                for attr, value in rating_data.items():
                    setattr(rating_instance, attr, value)
                rating_instance.save()
               
            else:
                # If rating doesn't exist, create a new on
                Rating.objects.create(worker=instance, **rating_data)
                
            
        # Step 3: Handle nested updates or creations if data exists
        if worker_skills_data is not None:
            # Create a set of existing skill IDs for comparison
            existing_skills = {skill.id for skill in instance.worker_skills.all()}
            
            # Keep track of updated or created skill IDs
            updated_skill_ids = set()

            for skill_data in worker_skills_data:
                worker_skill_id = skill_data.get('id')
                
                # Extract the nested skill data and find the Skill instance
                nested_skill_data = skill_data.pop('skill', None)
                
                # We must get the Skill object to link the WorkerSkill
                # The 'skill' field from the front-end contains the data needed to find the skill
                if nested_skill_data:
                    # Find the Skill object. You should use a unique field like `skill_name` or `id`.
                    # Assuming the front-end sends 'id' for the Skill itself
                    skill_id = nested_skill_data.get('id')
                    if not skill_id:
                        # Fallback in case ID is not sent, get by name.
                        # This is less robust but handles your current validated data.
                        skill_name = nested_skill_data.get('skill_name')
                        skill_instance = Skill.objects.get(skill_name=skill_name)
                    else:
                        skill_instance = Skill.objects.get(id=skill_id)
                else:
                    # This case is unlikely, but good to handle
                    skill_instance = None

                if worker_skill_id:
                    # Update existing worker skill
                    try:
                        worker_skill = instance.worker_skills.get(id=worker_skill_id)
                        for attr, value in skill_data.items():
                            setattr(worker_skill, attr, value)
                        worker_skill.save()
                        updated_skill_ids.add(worker_skill_id)
                    except WorkerSkill.DoesNotExist:
                        # Handle case where a non-existent ID is sent
                        pass
                else:
                    # Corrected logic for creating a new WorkerSkill
                    if skill_instance:
                        # Before creating, check if a WorkerSkill with this worker and skill already exists
                        try:
                            existing_worker_skill = WorkerSkill.objects.get(worker=instance, skill=skill_instance)
                            # If it exists, update it instead of creating a new one
                            for attr, value in skill_data.items():
                                setattr(existing_worker_skill, attr, value)
                            existing_worker_skill.save()
                            updated_skill_ids.add(existing_worker_skill.id)
                        except WorkerSkill.DoesNotExist:
                            # If it does not exist, then create it
                            new_worker_skill = WorkerSkill.objects.create(
                                worker=instance, 
                                skill=skill_instance, 
                                **skill_data
                            )
                            updated_skill_ids.add(new_worker_skill.id)
            
            skills_to_delete = existing_skills - updated_skill_ids
            instance.worker_skills.filter(id__in=skills_to_delete).delete()
            
        return instance