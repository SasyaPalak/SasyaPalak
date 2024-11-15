# api/utils.py
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
import random

def generate_verification_code():
    return str(random.randint(100000, 999999))

def send_verification_email(email, code):
    subject = 'Your Verification Code'
    message = f'Your verification code is {code}. Please enter this code to complete your registration.'
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email])
