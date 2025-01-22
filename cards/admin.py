from django.contrib import admin
from .models import Cards

@admin.register(Cards)
class CardsResponsesAdmin(admin.ModelAdmin):
    list_display = ('bank__name', 'name', 'type', 'updated_at','created_at')
    search_fields = ('bank__name', 'name', 'type')
    list_filter = ('created_at',)