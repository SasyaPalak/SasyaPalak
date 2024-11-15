from django.urls import path
from .views import register_user, verify_user

urlpatterns = [
    path('register/', register_user),
    path('verify/', verify_user),
]
