# api/urls.py
from django.urls import path
from .views import register_user, verify_user, login_user, reset_password,request_password_reset,verify_reset_code,change_password,loan_prediction,crop_yield_prediction_view,get_crop_prices
urlpatterns = [
    path('register/', register_user),
    path('verify/', verify_user),
    path('login/', login_user),
    path('reset-password/', reset_password),  # New endpoint for changing password
    path('request-password-reset/', request_password_reset),
    path('verify-reset-code/', verify_reset_code),
    path('change-password/', change_password),
    path('loan-predict/', loan_prediction),
    path('crop-yield-predict/', crop_yield_prediction_view, name='crop_yield_predict'),
    path('crops/', get_crop_prices, name='get_crop_prices'),
   
  
]

