# api/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'gender', 'email', 'password', 'address', 'phone_number']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class VerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.IntegerField()

class ChangePasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """
        Ensure the new password is sufficiently strong.
        """
        new_password = data.get('new_password')
        if len(new_password) < 8:
            raise serializers.ValidationError("New password must be at least 8 characters long.")
        return data
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

class PasswordChangeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)


class LoanCalculationSerializer(serializers.Serializer):
    crop_name = serializers.CharField(max_length=255)
    crop_yield_prediction = serializers.DecimalField(max_digits=10, decimal_places=2)
    market_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    loan_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    loan_tenure_years = serializers.IntegerField()
    interest_rate = serializers.DecimalField(max_digits=5, decimal_places=2)  # Interest rate in percentage

    expected_revenue = serializers.SerializerMethodField()
    total_repayment = serializers.SerializerMethodField()
    net_income = serializers.SerializerMethodField()

    def get_expected_revenue(self, obj):
        return obj['crop_yield_prediction'] * obj['market_price']

    def get_total_repayment(self, obj):
        return obj['loan_amount'] * ((1 + obj['interest_rate'] / 100) ** obj['loan_tenure_years'])

    def get_net_income(self, obj):
        expected_revenue = self.get_expected_revenue(obj)
        total_repayment = self.get_total_repayment(obj)
        return expected_revenue - total_repayment