


def data_serializer(data):
    data.pop('csrfmiddlewaretoken')
    # Filtrar as chaves com valores vazios
    invalid_fields = {key.split('_')[1]: value for key, value in data.items() if key != 'bank_number' and value == ''}
    if not invalid_fields:
        data = {key.split('_')[1]: value for key, value in data.items()}
    return data,invalid_fields
