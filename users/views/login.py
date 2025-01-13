from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User


# Create your views here.
def login_redirect(request):
    return redirect('users:login_view')


def login_view(request):
    if request.method == "POST":
        username_or_email = request.POST.get("usernameOrEmail")
        password = request.POST.get("password")

        # Tentativa de autenticação usando username ou email
        user = None
        if User.objects.filter(username=username_or_email).exists():
            user = authenticate(request, username=username_or_email, password=password)
        elif User.objects.filter(email=username_or_email).exists():
            user = authenticate(request, username=User.objects.get(email=username_or_email).username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home:home')  # Redireciona após sucesso
        else:
            messages.error(request, "Nome de usuário ou senha incorretos.")

    return render(request, "users/auth/login.html")


def logout_view(request):
    logout(request)
    return redirect('users:login_view') 