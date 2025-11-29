from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .serializers import UserSerializer
        
        
class UserDetailUpdateViewAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
            return self.request.user