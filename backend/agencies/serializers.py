from rest_framework import serializers
from .models import *
from .models import StaffingAgency
    
class StaffingAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffingAgency
        fields = '__all__'