from django.urls import path

app_name = 'cards'

from cards.ajax import main

urlpatterns = [
    path('api/create/<int:bank_id>',main.update_or_create,name='create_card'),

]