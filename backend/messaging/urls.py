from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('sms/schedule_made_notification/', schedule_made_notification.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)