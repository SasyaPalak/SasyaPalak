# Generated by Django 4.2.16 on 2024-11-15 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_user_is_verified_user_code_expiry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='code_expiry',
        ),
        migrations.AddField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
