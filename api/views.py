# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from .models import User
from .serializers import UserSerializer
from .utils import generate_verification_code, send_verification_email

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
