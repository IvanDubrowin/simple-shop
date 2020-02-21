from typing import Optional

from django.db import models, transaction

from core.models.carousel import Carousel
from core.models.contact_info import ContactInfo
from core.models.content import Content


class UiConfig(models.Model):
    """
    Конфигурация интерфейса сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    is_current: Optional[bool] = models.NullBooleanField(
        default=None,
        unique=True,
        verbose_name='Активная конфигурация'
    )
    carousel: Carousel = models.ForeignKey(Carousel, on_delete=models.CASCADE, verbose_name='Карусель')
    contact_info: ContactInfo = models.ForeignKey(
        ContactInfo,
        on_delete=models.CASCADE,
        verbose_name='Контактная информация сайта'
    )
    content: Content = models.ForeignKey(Content, on_delete=models.CASCADE, verbose_name='Контент')

    def __str__(self) -> str:
        return self.title

    @transaction.atomic
    def save(self, *args, **kwargs) -> None:
        if self.is_current is True:
            UiConfig.objects.exclude(pk=self.pk).update(is_current=None)
        if self.is_current is False:
            self.is_current = None
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'ui_config'
        verbose_name = 'Конфигурация интерфейса'
        verbose_name_plural = 'Конфигурации интерфейса'
