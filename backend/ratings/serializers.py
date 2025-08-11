from rest_framework import serializers
from .models import *
from users.models import User
from workers.models import ContractWorker

class NestedWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractWorker
        fields = ['first_name', 'last_name']

class NestedManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'role', 'organization', 'is_active']

class RatingSerializer(serializers.ModelSerializer):
    worker = NestedWorkerSerializer()
    manager = NestedManagerSerializer()
    average_worker_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Rating
        fields = [
            'worker',
            'average_worker_rating',
            'attendance_score',
            'performance_score',
            'communication_score',
            'skills_score',
            'comment',
            'created_at',
            'manager',
            'id',
        ]
    
    def get_average_worker_rating(self, obj):
        return obj.get_average_score()