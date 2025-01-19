from src.data import data_serializer
from django.http import JsonResponse
from cards.models import Cards
from banks.models import Banks

def create(request,bank_id):
    try:
        data = request.POST.dict()
        data,invalid_fields = data_serializer(data)
        if invalid_fields:
            print("Os seguintes campos estão inválidos:", invalid_fields)
            return JsonResponse({
                'status': False,
                'empty_fields': data
            })
        bank = Banks.objects.filter()
        card = Cards.objects.update_or_create(**data,bank=)
        card.save()
        return JsonResponse({
            'status':True,
            'message':'Cartão criado com sucesso!'
        })
    except Exception as e:
        return JsonResponse(
            {
                'status':False,
                'message':'Erro na criação da forma de pagamento.'
            }
        ) 