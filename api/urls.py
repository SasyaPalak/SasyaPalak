# api/urls.py
from django.urls import path
from .views import register_user, verify_user, login_user, reset_password,request_password_reset,verify_reset_code,change_password

urlpatterns = [
    path('register/', register_user),
    path('verify/', verify_user),
    path('login/', login_user),
    path('reset-password/', reset_password),  # New endpoint for changing password
    path('request-password-reset/', request_password_reset),
    path('verify-reset-code/', verify_reset_code),
    path('change-password/', change_password),
  
]

