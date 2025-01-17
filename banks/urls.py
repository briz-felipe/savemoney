from django.urls import path

app_name = 'banks'

from banks import views
from banks.ajax import main

urlpatterns = [
    path('<int:user_id>',views.create_bank,name='create_bank'),
    path('api/create',main.create,name='api_create_bank'),
    path('api/get/<int:bank_id>',main.get_bank,name='api_get_bank'),
    path('api/update/<int:bank_id>',main.update,name='api_update_bank'),
    path('api/delete/<int:bank_id>',main.delete,name='api_delete_bank'),
    path('api/banks',main.get_banks,name='api_get_bank'),

]