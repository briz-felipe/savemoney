# Generated by Django 5.1.4 on 2025-01-28 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cards',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
