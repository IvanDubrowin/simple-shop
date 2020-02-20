from django.db import models

from core.models.carousel import Carousel
from core.models.contact_info import ContactInfo
from core.models.content import Content


class UiConfig(models.Model):
    """
    Конфигурация интерфейса сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    carousel: Carousel = models.ForeignKey(Carousel, on_delete=models.CASCADE, verbose_name='Карусель')
    contact_info: ContactInfo = models.ForeignKey(
        ContactInfo,
        on_delete=models.CASCADE,
        verbose_name='Контактная информация сайта'
    )
    content: Content = models.ForeignKey(Content, on_delete=models.CASCADE, verbose_name='Контент')

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'ui_config'
        verbose_name = 'Конфигурация интерфейса'
        verbose_name_plural = 'Конфигурации интерфейса'
