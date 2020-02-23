from django.forms import ModelForm

from core.models import UiConfig


class UiConfigAdminForm(ModelForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        choices = (
            (True, 'Да'),
            (False, 'Нет')
        )
        self.fields['is_current'].widget.choices = choices

    class Meta:
        model = UiConfig
        fields = '__all__'
