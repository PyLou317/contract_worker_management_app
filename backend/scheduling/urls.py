from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('schedules/', SchedulingListViewAPI.as_view()),
    path('shifts/', ShiftListViewAPI.as_view()),
    path('areas/', AreaListViewAPI.as_view()),
    path('managers/', ManagerListViewAPI.as_view()),
    path('schedule/create/', CreateScheduleView.as_view(), name='create-schedule'),
    path('schedules/<int:pk>/', ScheduleDetailUpdateViewAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)