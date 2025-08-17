from rest_framework import serializers
from .models import *

class ContractWorkerSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    agency = serializers.StringRelatedField()
    current_contract = serializers.StringRelatedField()
    comment = serializers.SerializerMethodField()
    
    class Meta:
        model = ContractWorker
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'current_contract', 'agency', 'average_rating', 'comment')
        
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