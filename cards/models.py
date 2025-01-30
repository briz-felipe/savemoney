from django.db import models
from django.contrib.auth.models import User
from banks.models import Banks

class Cards(models.Model):
    TYPE_CHOICES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
        ('VA', 'VA'),
        ('VR', 'VR'),
    ]
    
    bank = models.ForeignKey(Banks, on_delete=models.CASCADE, related_name="cards")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    name = models.CharField(max_length=100, help_text="Nickname for the card")
    editor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="edited_cards")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"
