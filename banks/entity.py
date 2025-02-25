from dataclasses import dataclass, asdict
from typing import Optional, Union
from banks.models import Banks
from django.contrib.auth.models import User


@dataclass
class BankEntity:
    id : Optional[int] = None
    user: Optional[User] = None
    name: str = ""
    description: str = ""
    is_active: Optional[bool] = True
    number: Optional[int] = None
    color: Optional[str] = "#FFFFFF"

    def __str__(self) -> str:
        return f"{self.name}"
    
    def name_exists(self)->bool:
        bank = Banks.objects.filter(user=self.user,name=self.name,is_active=True)       
        return bank.exists()

    def create(self) -> Banks:
        """
        Cria uma instância do modelo `Banks` com base nos dados da entidade e salva no banco de dados.
        Retorna a instância salva.
        """
        if self.name_exists():
            raise ValueError(f'Banco:({self.name}) já foi criado e está ativo ainda.')
        
        # Filtrar apenas campos válidos
        data = {k: v for k, v in asdict(self).items() if v!=''}
        # Criar e salvar a instância do modelo
        try:
            db_instance = Banks(**data)
            db_instance.save()
            return db_instance
        except Exception as e:
            raise ValueError(f"Erro ao criar o banco:({self.name})")

    def update(self) -> Banks:
        # Filtra os campos válidos para atualização
        data = {k: v for k, v in asdict(self).items() if v != '' and k != 'id'}
        
        try:
            # Busca a instância no banco de dados pelo ID
            db_instance = Banks.objects.get(id=self.id)
            
            # Atualiza os campos na instância do modelo
            for key, value in data.items():
                setattr(db_instance, key, value)
            
            # Salva as alterações no banco de dados
            db_instance.save()
            return db_instance
        
        except Banks.DoesNotExist:
            raise ValueError(f'Banco com ID {self.id} não encontrado.')
        except Exception as e:
            raise ValueError(f'Erro ao editar o banco:({self.name}). Detalhes: {str(e)}')


    @staticmethod
    def from_model(bank_model: Banks) -> "BankEntity":
        """
        Cria uma instância da entidade `BankEntity` a partir de uma instância do modelo Django `Banks`.
        """
        return BankEntity(
            user=bank_model.user,
            name=bank_model.name,
            description=bank_model.description,
            is_active=bank_model.is_active,
            number=bank_model.number,
            color=bank_model.color,
        )
