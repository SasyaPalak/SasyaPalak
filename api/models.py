# api/models.py
from django.db import models
from django.contrib.auth.hashers import make_password, check_password




class User(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
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

class CropPrice(models.Model):
    crop_name = models.CharField(max_length=100)
    average_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.crop_name} - NPR {self.average_price}"