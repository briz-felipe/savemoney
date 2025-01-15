from django.urls import path

app_name = 'banks'

from . import views

urlpatterns = [
    path('',views.create_bank,name='create_bank'),

]