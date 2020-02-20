from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class ContactInfo(models.Model):
    """
    Контактная информация сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    description: str = models.TextField(blank=True, verbose_name='Доп. информация')
    phone_number: str = PhoneNumberField(verbose_name='Номер телефона')
    email: str = models.EmailField(verbose_name='Email')
    instagram: str = models.CharField(max_length=255, blank=True, verbose_name='Instagram')
    vk: str = models.CharField(max_length=255, blank=True, verbose_name='VK')

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'contact_info'
        verbose_name = 'Контактная информация'
        verbose_name_plural = 'Контактная информация'
