# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from django.contrib.auth.hashers import check_password, make_password
from .models import User
from .serializers import UserSerializer, LoginSerializer
from .utils import generate_verification_code, send_verification_email,generate_verification_code,send_reset_password_email
from .serializers import (
    PasswordResetRequestSerializer,
    PasswordResetVerifySerializer,
    PasswordChangeSerializer,
)
from .serializers import ChangePasswordSerializer
import logging
from api.models import User
from django.http import JsonResponse
import traceback

CACHE_TIMEOUT = 300  # 5 minutes

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']

        # Generate a verification code
        verification_code = generate_verification_code()

        # Send verification email
        send_verification_email(email, verification_code)

        # Store user data in cache for 5 minutes
        cache.set(f"temp_user_{email}", serializer.validated_data, CACHE_TIMEOUT)
        cache.set(f"verification_code_{email}", verification_code, CACHE_TIMEOUT)

        return Response(
            {'message': 'Check your email for the verification code.'}, 
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verify_user(request):
    email = request.data.get('email')
    code = request.data.get('code')

    # Retrieve the stored verification code and user data
    stored_code = cache.get(f"verification_code_{email}")
    user_data = cache.get(f"temp_user_{email}")

    if not stored_code or not user_data:
        return Response({'error': 'Verification code expired or invalid.'}, status=status.HTTP_400_BAD_REQUEST)

    if stored_code == code:
        # Save the verified user to the database
        user = User.objects.create(**user_data, is_verified=True)
        cache.delete(f"temp_user_{email}")
        cache.delete(f"verification_code_{email}")
        return Response({'message': 'Email verified and user registered successfully.'}, status=status.HTTP_201_CREATED)
    
    return Response({'error': 'Invalid verification code.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
            if not user.is_verified:
                return Response({'error': 'Email is not verified.'}, status=status.HTTP_400_BAD_REQUEST)

            if check_password(password, user.password):
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)
@api_view(['POST'])
def reset_password(request):
    try:
        email = request.data.get('email')
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        # Check if all fields are provided
        if not email or not old_password or not new_password:
            return JsonResponse({'error': 'Email, old password, and new password are required'}, status=400)

        # Fetch user from the database
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Debugging log: check fetched user details
        print(f"User found: {user.email}")

        # Check if the old password matches
        if not check_password(old_password, user.password):
            print(f"Old password check failed for user: {user.email}")
            return JsonResponse({'error': 'Old password is incorrect'}, status=400)

        # Debugging log: check before updating password
        print("Old password verified. Proceeding to update the password...")

        # Update to the new password (hash it before saving)
        user.password = make_password(new_password)
        user.save()

        # Debugging log: confirm password update
        print(f"Password updated successfully for user: {user.email}")

        return JsonResponse({'message': 'Password updated successfully'}, status=200)
    
    except Exception as e:
        # Log the full error traceback for debugging
        print("Error occurred:", e)
        traceback.print_exc()
        return JsonResponse({'error': 'Internal Server Error'}, status=500)

def check_user_password(request):
    try:
        email = request.GET.get('email')
        old_password = request.GET.get('old_password')

        # Validate email and password parameters
        if not email or not old_password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        # Fetch user from the database
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Check if the provided password matches the hashed password
        is_correct_password = check_password(old_password, user.password)
        return JsonResponse({'password_match': is_correct_password})
    
    except Exception as e:
        # Log the error with traceback
        print("Error occurred:", e)
        traceback.print_exc()
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
    
    

@api_view(['POST'])
def request_password_reset(request):
    serializer = PasswordResetRequestSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
            # Generate reset code and send email
            reset_code = generate_verification_code()
            user.reset_password_code = reset_code
            user.save()
            send_reset_password_email(user.email, reset_code)
            return Response({'message': 'Verification code sent to your email.'}, status=200)
        except User.DoesNotExist:
            return Response({'error': 'Email not found.'}, status=404)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def verify_reset_code(request):
    serializer = PasswordResetVerifySerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        try:
            user = User.objects.get(email=email)
            if user.reset_password_code == code:
                # Clear the reset_password_code to allow password change
                user.reset_password_code = None
                user.save()
                return Response({'message': 'Verification successful. You can now reset your password.'}, status=200)
            return Response({'error': 'Invalid verification code.'}, status=400)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def change_password(request):
    serializer = PasswordChangeSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        new_password = serializer.validated_data['new_password']
        try:
            user = User.objects.get(email=email)
            # Check if the user has been verified
            if user.reset_password_code is not None:
                return Response({'error': 'Please verify the code before changing your password.'}, status=400)
            
            # Change the password if verification is successful
            user.password = make_password(new_password)
            user.save()
            return Response({'message': 'Password changed successfully.'}, status=200)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
    return Response(serializer.errors, status=400)