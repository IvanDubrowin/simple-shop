from captcha.fields import CaptchaField
from django.contrib.admin.forms import AdminAuthenticationForm
from django.forms import ModelForm
from djrichtextfield.widgets import RichTextWidget

from shop.models import Product
from ui.models import ContactInfo, Content, UiConfig


class ContentAdminForm(ModelForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields['text'].widget = RichTextWidget()

    class Meta:
        model = Content
        fields = '__all__'


class ContactInfoAdminForm(ModelForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields['description'].widget = RichTextWidget()

    class Meta:
        model = ContactInfo
        fields = '__all__'


class ProductAdminForm(ModelForm):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields['description'].widget = RichTextWidget()

    class Meta:
        model = Product
        fields = '__all__'


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
