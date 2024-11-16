# api/urls.py
from django.urls import path
from .views import register_user, login_user, reset_password,request_password_reset,verify_reset_code,change_password,loan_prediction,LoanCalculationView,crop_yield_prediction_view

urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('reset-password/', reset_password),  # New endpoint for changing password
    path('request-password-reset/', request_password_reset),
    path('verify-reset-code/', verify_reset_code),
    path('change-password/', change_password),
    path('loan-predict/', loan_prediction),
    path('calculate-loan/', LoanCalculationView.as_view(), name='loan-calculation'),
    path('crop_tr/',crop_yield_prediction_view)
]

