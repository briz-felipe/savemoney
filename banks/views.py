from django.shortcuts import render
from .forms import BanksForm

def create_bank(request):
    
    if request.method == 'POST':
        form = BanksForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = BanksForm()
    
    return render(request, 'banks/create_bunk/index.html', {'form': form})
