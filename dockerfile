# Use uma imagem base do Python
FROM python:3.12-slim

# Instale as dependências do sistema necessárias para o Django e o banco de dados
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    libmariadb-dev \
    libmariadb-dev-compat \
    pkg-config \
    libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de dependências para o contêiner
COPY requirements.txt .

# Instale as dependências do Python
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

    
    
# Copie o código do projeto para o contêiner
COPY . .
    

# Exponha a porta padrão do Django (8000)
EXPOSE 8000

# Comando para aplicar as migrações e iniciar o servidor com Gunicorn
CMD ["sh", "-c", "python manage.py migrate && python manage.py initSaveMoney && gunicorn -b 0.0.0.0:8000 savemoney.wsgi:application"]
