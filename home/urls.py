from django.urls import path

app_name = 'home'

from users.views import home

urlpatterns = [
    path('',home.home,name='home'),

]