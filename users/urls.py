from django.urls import path

app_name = 'users'

from users.views import login

urlpatterns = [
    path('',login.login_redirect,name='login_redirect'),
    path('login',login.login_view,name='login_view'),

]