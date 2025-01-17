from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from banks.entity import BankEntity
from banks.models import Banks
from django.shortcuts import get_object_or_404

@login_required
def get_banks(request):
    banks = Banks.objects.filter(user=request.user).values()
    context = {}
    context['bancos'] = list(banks)    
    return JsonResponse({
        'status':True,
        'data':context
    })

@login_required
def create(request):
    
    try:
        data = request.POST.dict()
        data.pop('csrfmiddlewaretoken')
        
        # Filtrar as chaves com valores vazios
        invalid_fields = {key: value for key, value in data.items() if key != 'number' and value == ''}

        if invalid_fields:
            print("Os seguintes campos estão inválidos:", invalid_fields)
            return JsonResponse({
                'status':False,
                'empty_fields':data
            })
        bank:BankEntity = BankEntity(**data,user=request.user)
        bank.create()
        banks = Banks.objects.filter(user=request.user).values()
        
        return JsonResponse({
            'status':True,
            'message':'Banco criado com sucesso',
            'banks':list(banks)
        })
    
    except ValueError as e:
        return JsonResponse({
            'status':False,
            'error':str(e)
        })         
    except Exception as e:
        print(str(e))
        return JsonResponse({
            'status':False,
            'error':'Exception error'
        })
   

        
@login_required
def delete(request, bank_id):
    # Busca o banco pelo ID ou retorna 404
    bank = get_object_or_404(Banks, id=bank_id)

    # Desativar o banco (soft delete)
    bank.is_active = False
    bank.save()

    # Resposta de sucesso
    return JsonResponse({
        'status': True,
        'message': 'Banco deletado com sucesso!'
    }, status=200)