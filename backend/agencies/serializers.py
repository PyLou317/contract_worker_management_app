from rest_framework import serializers
from .models import *
from .models import StaffingAgency
    
class StaffingAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffingAgency
        fields = '__all__'
        read_only_fields = ('organization',)
        
    def create(self, validated_data):
        request = self.context.get('request', None)
        
        if not request:
            raise serializers.ValidationError({'detail': 'Request context missing for organization assignment.'})
        
        organization = request.user.organization
        
        if not organization:
            raise serializers.ValidationError({'detail': 'You must be associated with an organization to create an agency.'})
        
        validated_data['organization'] = organization
        agency = super().create(validated_data)
        return agency