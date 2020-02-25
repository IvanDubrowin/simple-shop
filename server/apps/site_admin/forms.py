from captcha.fields import CaptchaField
from django.contrib.admin.forms import AdminAuthenticationForm
from django.forms import ModelForm

from ui.models import UiConfig


class CaptchaAdminAuthenticationForm(AdminAuthenticationForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields['captcha'] = CaptchaField()


class UiConfigAdminForm(ModelForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        choices = (
            (True, 'Да'),
            (False, 'Нет')
        )
        self.fields['is_active'].widget.choices = choices

    class Meta:
        model = UiConfig
        fields = '__all__'
