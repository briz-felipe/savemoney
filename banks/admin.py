from django.contrib import admin
from .models import Banks

@admin.register(Banks)
class BanksResponsesAdmin(admin.ModelAdmin):
    list_display = ('user__username', 'name', 'description','is_active', 'updated_at','created_at')
    search_fields = ('user__username', 'name','number')
    list_filter = ('created_at',)