# api/urls.py
from django.urls import path
from .views import register_user, verify_user, login_user, reset_password

urlpatterns = [
    path('register/', register_user),
    path('verify/', verify_user),
    path('login/', login_user),
    path('reset-password/', reset_password),  # New endpoint for changing password
  
]

