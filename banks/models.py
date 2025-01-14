from django.db import models
from django.contrib.auth.models import User
from colorfield.fields import ColorField


class Banks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_banks', null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    number = models.IntegerField(null=True, blank=True)
    color = ColorField(default='#FFFFFF')

    class Meta:
        verbose_name_plural = "Banks"  # Nome plural personalizado
        verbose_name = "Bank"  # Nome singular personalizado (opcional)

    def __str__(self):
        return f"{self.name}({self.user})"

