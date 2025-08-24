"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView, 
    TokenVerifyView,
    )


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # All API endpoints for your custom apps are included here
    path('api/', include('users.urls')),
    path('api/', include('workers.urls')),
    path('api/', include('scheduling.urls')),
    path('api/', include('agencies.urls')),
    path('api/', include('organizations.urls')),
    path('api/', include('ratings.urls')),
    
    # DRF + dj_rest_auth authentication urls
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # allauth urls (for account email verification, password reset, etc.)
    path('accounts/', include('allauth.urls')),
]