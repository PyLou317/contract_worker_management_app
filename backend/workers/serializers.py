from rest_framework import serializers
from .models import *
from agencies.models import StaffingAgency as Agency
from organizations.models import WarehouseBusiness as Contract
from ratings.serializers import RatingSerializer


class AgencyNameField(serializers.CharField):
    def to_representation(self, value):
        # This returns the name of the agency for display
        return value.name
    
class ContractWorkerSerializer(serializers.ModelSerializer):
    current_contract = serializers.CharField(write_only=True)
    ratings = RatingSerializer(many=True, read_only=True)

    # Read-only field for displaying the full agency details
    agency_details = serializers.SerializerMethodField()
    
    agency = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Agency.objects.all(),
        write_only=True
    )
    
    # New field to display the human-readable position label
    position = serializers.SerializerMethodField()
    
    class Meta:
        model = ContractWorker
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
            'ratings'
            )
        extra_kwargs = {
            'current_contract': {'write_only': True},
            'position': {'write_only': True}
            }
    
    # def get_rating(self, obj):
    #     return obj.rating
        
    def get_agency_details(self, obj):
        # A custom method to return the agency's name for representation
        return obj.agency.name
    
    def get_position(self, obj):
        # This method calls Django's built-in get_FOO_display method to get the human-readable label
        return obj.get_position_display()
        
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings:
            total_score = sum(rating.get_average_score() for rating in ratings)
            return total_score / ratings.count()
        return 0
    
    def create(self, validated_data):
        agency_name = validated_data.pop('agency')
        contract_name = validated_data.pop('current_contract')
       
        try:
            agency_obj = Agency.objects.get(name=agency_name)
        except Agency.DoesNotExist:
            raise serializers.ValidationError(
                {"agency": "Agency with this name does not exist."}
            )
        
        # 4. Look up the Contract object based on the name
        try:
            contract_obj = Contract.objects.get(name=contract_name)
        except Contract.DoesNotExist:
            raise serializers.ValidationError(
                {"current_contract": "Contract with this name does not exist."}
            )
        
        worker = ContractWorker.objects.create(
            agency=agency_obj, 
            current_contract=contract_obj, 
            **validated_data
            )
        
        return worker