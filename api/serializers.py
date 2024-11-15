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