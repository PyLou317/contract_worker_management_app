from rest_framework import serializers
from .models import *
from agencies.models import StaffingAgency as Agency
from organizations.models import WarehouseBusiness as Contract


class ContractWorkerSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    current_contract = serializers.CharField(write_only=True)
    comment = serializers.SerializerMethodField()
    agency = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Agency.objects.all()
    )
    
    class Meta:
        model = ContractWorker
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'current_contract','agency', 'average_rating', 'comment')
        extra_kwargs = {
            'agency': {'write_only': True},
            'current_contract': {'write_only': True},
            }
        
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings:
            total_score = sum(rating.get_average_score() for rating in ratings)
            return total_score / ratings.count()
        return 0
    
    def get_comment(self, obj):
        ratings = obj.ratings.all()
        if ratings:
            return ratings[0].comment
        return None
    
    
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