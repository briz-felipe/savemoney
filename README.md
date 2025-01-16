# SaveMoney - Sistema de Lançamento de Gastos e Controle Financeiro

SaveMoney é um sistema completo para gerenciar seus gastos e ter um controle financeiro eficiente. Desenvolvido em Django, este projeto permite registrar, visualizar e categorizar despesas, além de fornecer relatórios financeiros.

## Funcionalidades

- Cadastro e gerenciamento de categorias de gastos
- Registro de despesas com data e valor
- Relatórios financeiros detalhados
- Interface de usuário intuitiva

## Tecnologias Usadas

- Python 3.x
- Django 4.x
- Bootstrap 4 (para o frontend)

## Requisitos

Antes de começar, você precisa ter instalado:

- [Python 3.x](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/get-started) (para rodar o projeto em containers)


## Instalação

Siga os passos abaixo para instalar e rodar o projeto **SaveMoney** localmente.

### 1. Clone o repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/briz-felipe/savemoney.git
cd saveMone
```
### 2. Crie e ative o ambiente virtual

Para isolar as dependências do projeto, é recomendado usar um ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate   # No Windows use 'venv\Scripts\activate'
```

### 2. Instale as dependências

Com o ambiente virtual ativado, instale as dependências necessárias:

```bash
pip install -r requirements.txt
```

### 3. Realize as migrações

Crie as tabelas do banco de dados e as migrações:

```bash
python manage.py migrate
```

### 4. Crie um superusuário

Para acessar o painel administrativo do Django, crie um superusuário:

```bash
python manage.py createsuperuser
```

Digite as informações solicitadas (nome de usuário, e-mail, senha).

### 5. Rode o servidor de desenvolvimento

Agora, você pode rodar o servidor de desenvolvimento:

```bash
python manage.py runserver
```

O Django estará rodando em `http://127.0.0.1:8000/`. Acesse a URL no seu navegador.

### 6. Acesse o painel administrativo

Para acessar o painel administrativo do Django, use as credenciais do superusuário que você criou. A URL será:

```
http://127.0.0.1:8000/admin
```

### 7.  Buildar a imagem Docker
No diretório onde o `Dockerfile` está localizado, execute o comando para **buildar** a imagem com o nome `savemoney`:
```bash
docker build -t savemoney .
```
### 8. Rodar a imagem Docker
Depois de buildar a imagem, você pode rodá-la com o seguinte comando:

```bash
docker run -p 8000:8000 savemoney
```

Isso fará com que o Django rode no container e fique acessível em `http://localhost:8000`.
