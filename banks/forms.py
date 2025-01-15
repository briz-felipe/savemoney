from django import forms
from .models import Banks

class BanksForm(forms.ModelForm):
    class Meta:
        model = Banks
        fields = ['name', 'description', 'is_active', 'number', 'color']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Bank Name'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Enter Description'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'number': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Enter Bank Number'}),
            'color': forms.TextInput(attrs={'type': 'color', 'class': 'form-control'}),
        }
