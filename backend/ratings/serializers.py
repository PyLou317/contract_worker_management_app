from rest_framework import serializers
from .models import *
from users.models import User


class NestedManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
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
    id = serializers.IntegerField(read_only=False, required=False, allow_null=True)
    
    class Meta:
        model = Rating
        fields = [
            'id',
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