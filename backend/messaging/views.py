from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .utilities.sendSMS import send_schedule_made_notification
import re


class schedule_made_notification(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        to_number = request.data.get('to_number')
        message_body = request.data.get('message_body')
        
        if not to_number or not message_body:
            return Response({'error': 'Both to_number and message_body are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        e164_regex = r'^\+[1-9]\d{10,14}$'
        if not re.fullmatch(e164_regex, to_number):
            return Response(
                {'error': 'Invalid phone number format. Must be in E.164 format (e.g., +12025550123).'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sid = send_schedule_made_notification(to_number, message_body)
        
        if sid:
            return Response({'message': 'SMS sent successfully.', 'sid': sid}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Failed to send SMS.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        