from rest_framework import serializers
from .models import *

class ContractWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractWorker
        fields = '__all__'
        depth = 1