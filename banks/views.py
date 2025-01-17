from django.shortcuts import render
from banks.models import Banks
from django.contrib.auth.models import User

def create_bank(request,user_id):
    
    if request.user.id != user_id:
        raise Exception('Access denied')
    
    user = User.objects.filter(id=user_id)
    if not user.exists():
        raise Exception('User not find')
    
    banks = Banks.objects.filter(user=user.get()).values()
    context = {}
    context['bancos'] = list(banks)    
    return render(request, 'banks/create_bunk/index.html',context)




