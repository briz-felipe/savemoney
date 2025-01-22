from src.data import data_serializer
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from cards.models import Cards
from banks.models import Banks

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
