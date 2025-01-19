from django.http import JsonResponse
from banks.models import Banks
from banks.entity import BankEntity
from src.data import data_serializer

def process_bank(data: dict, user, operation_function):
    """
    Processa a criação ou atualização de um banco.

    Args:
        data (dict): Dados do banco.
        user (User): Usuário associado.
        operation_function (callable): Função a ser chamada (ex: bank.create ou bank.update).

    Returns:
        JsonResponse: Resposta com o status da operação.
    """
   
    # Serializar e validar os dados
    data, invalid_fields = data_serializer(data)
    if invalid_fields:
        print("Os seguintes campos estão inválidos:", invalid_fields)
        return JsonResponse({
            'status': False,
            'empty_fields': data
        })
   
    # Criar a entidade do banco
    bank = BankEntity(**data, user=user)
    
    # Chamar a função de operação (create ou update)
    try:
        operation_function(bank)
        banks = Banks.objects.filter(user=user).values()
        return JsonResponse({
            'status': True, 
            'message': f"Banco {'criado' if operation_function.__name__ == 'create' else 'atualizado'} com sucesso!",
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