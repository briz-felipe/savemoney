from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from banks.entity import BankEntity
from banks.models import Banks
from banks.ajax.utils import data_serializer,process_bank
from django.shortcuts import get_object_or_404
from datetime import datetime

@login_required
def get_banks(request):
    banks = Banks.objects.filter(user=request.user).values()
    context = {}
    context['bancos'] = list(banks)    
    return JsonResponse({
        'status':True,
        'data':context
    })

def get_bank(request,bank_id):
    context = {}
    context['banco'] = Banks.objects.filter(id=bank_id).values("name","description","color").first()
    return JsonResponse({
        'status':True,
        'data':context
    })

@login_required
def create(request):
    data = request.POST.dict()  # Ou outra origem de dados
    return process_bank(data, request.user, lambda bank: bank.create())
    
@login_required
def update(request, bank_id):
    data = request.POST.dict()  # Ou outra origem de dados
    data['id'] = bank_id
    return process_bank(data, request.user, lambda bank: bank.update())
    
@login_required
def delete(request, bank_id):
    # Busca o banco pelo ID ou retorna 404
    bank = get_object_or_404(Banks, id=bank_id)

    # Desativar o banco (soft delete)
    bank.is_active = False
    bank.updated_at = datetime.now()
    bank.save()

    # Resposta de sucesso
    return JsonResponse({
        'status': True,
        'message': 'Banco deletado com sucesso!'
    }, status=200)