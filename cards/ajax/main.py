from src.data import data_serializer
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from cards.models import Cards
from banks.models import Banks
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def get_cards(request, bank_id):
    bank = get_object_or_404(Banks, id=bank_id)
    cards = Cards.objects.filter(bank=bank).order_by('-created_at')
    
    # Montando a lista de cards com o nome concatenado
    cards_list = [
        {
            "name": card["name"],
            "type": card["type"],
            "id": card["id"],
            "is_active": card["is_active"],
            "created_at": card["created_at"],
            "label": f"{card["name"]}({card['bank__name']} {card['type']})"
        }
        for card in cards.values("id","is_active","name", "type", "bank__name","created_at")
    ]
    
    return JsonResponse({"cards": cards_list})

    

@require_http_methods(["POST"])
def update_or_create(request, bank_id):
    try:
        # Converte os dados do request para um dicionário
        data = request.POST.dict()

        # Serializa e valida os dados recebidos
        data, invalid_fields = data_serializer(data)
        if invalid_fields:
            return JsonResponse({
                'status': False,
                'empty_fields': invalid_fields,
                'message': "Campos inválidos fornecidos."
            }, status=400)

        # Verifica se o banco existe
        bank = get_object_or_404(Banks, id=bank_id)

        # Cria ou atualiza o cartão associado ao banco
        card, created = Cards.objects.update_or_create(**data, bank=bank)

        return JsonResponse({
            'status': True,
            'message': 'Cartão criado com sucesso!' if created else 'Cartão já cadastrado!',
            'card_id': card.id
        }, status=201)

    except ValueError as ve:
        # Erros de valor ou tipo de dados
        return JsonResponse({
            'status': False,
            'message': f'Erro de valor: {str(ve)}'
        }, status=400)

    except Exception as e:
        # Erro genérico
        return JsonResponse({
            'status': False,
            'message': 'Erro na criação da forma de pagamento.',
            'error': str(e)  # Apenas em ambiente de desenvolvimento
        }, status=500)
