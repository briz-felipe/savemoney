from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group,User
from django.db import transaction
from savemoney.settings import SUPERUSER_PASSWORD,SUPERUSER_USERNAME


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                self.stdout.write('\nCriando um superusuário.')
                if not User.objects.filter(is_superuser=True).exists():
                    # Cria um superusuário
                    user = User.objects.create_superuser(username=SUPERUSER_USERNAME, password=SUPERUSER_PASSWORD)
                    self.stdout.write(self.style.SUCCESS(f"\t=> Superusuário '{SUPERUSER_USERNAME}' criado com sucesso."))
        
        except Exception as e: 
           self.stdout.write(self.style.ERROR(f"\n\n ========> ATENÇÃO!")) 
           self.stdout.write(self.style.ERROR(f"\tErro em alguma parte do processo inicial da plataforma de cupons")) 
           self.stdout.write(self.style.ERROR(f"\n\tERROR: ({str(e)})")) 
        finally:
            self.stdout.write(self.style.SUCCESS("\n\nAs configurações iniciais da plataforma de cupons foram realizadas com sucesso. Parabéns pelo excelente trabalho!\n\n"))