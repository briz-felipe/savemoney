from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from banks.entity import BankEntity
from banks.models import Banks

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
            
    except Exception as e:
        print(str(e))
        return JsonResponse({
            'status':False,
            'error':'Exception error'
        })