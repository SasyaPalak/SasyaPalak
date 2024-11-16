# api/models.py
from django.db import models
from django.contrib.auth.hashers import make_password, check_password



GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
    ('Rather Not Say', 'Rather Not Say')
    ]
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, null=True)
    reset_password_code = models.CharField(max_length=6, blank=True, null=True)
    def save(self, *args, **kwargs):
        # Hash the password before saving to the database
        if not self.pk:  # Hash password only on new user creation
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

