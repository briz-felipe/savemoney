from django.urls import path

app_name = 'banks'

from banks import views
from banks import ajax

urlpatterns = [
    path('<int:user_id>',views.create_bank,name='create_bank'),
    path('api/create',ajax.create,name='api_create_bank'),
    path('api/banks',ajax.get_banks,name='api_get_bank'),

]