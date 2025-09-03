from rest_framework import serializers
from .models import *
from users.models import User


class NestedManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 
            'last_name', 
            'email', 
            'role', 
            'organization', 
            'is_active'
        ]

class RatingSerializer(serializers.ModelSerializer):
    manager = NestedManagerSerializer()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Rating
        fields = [
            'average_rating',
            'attendance_score',
            'performance_score',
            'communication_score',
            'skills_score',
            'comment',
            'created_at',
            'manager',
        ]
    
    def get_average_rating(self, obj):
        return obj.get_average_score()