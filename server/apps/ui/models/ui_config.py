from typing import Optional

from django.db import models, transaction

from core.utils import admin_display
from ui.models.carousel import Carousel
from ui.models.contact_info import ContactInfo
from ui.models.content import Content


class UiConfig(models.Model):
    """
    Конфигурация интерфейса сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    is_active: Optional[bool] = models.NullBooleanField(
        default=None,
        unique=True,
        verbose_name='Активная конфигурация'
    )
    carousel: Carousel = models.ForeignKey(Carousel, on_delete=models.CASCADE, verbose_name='Карусель')
    contact_info: ContactInfo = models.ForeignKey(
        ContactInfo,
        on_delete=models.CASCADE,
        related_name='configs',
        verbose_name='Контактная информация сайта'
    )
    content: Content = models.ForeignKey(
        Content,
        on_delete=models.CASCADE,
        related_name='configs',
        verbose_name='Контент'
    )

    def __str__(self) -> str:
        return self.title

    @transaction.atomic
    def save(self, *args, **kwargs) -> None:
        if self.is_active is True:
            UiConfig.objects.exclude(pk=self.pk).update(is_active=None)
        if self.is_active is False:
            self.is_active = None
        super().save(*args, **kwargs)

    def validate_unique(self, exclude=None) -> None:
        exclude = ('is_active',)
        super().validate_unique(exclude=exclude)

    @admin_display(short_description='Активная конфигурация', boolean=True)
    def get_is_active(self) -> bool:
        if self.is_active is True:
            return True
        return False

    @classmethod
    def get_active_config(cls) -> Optional['UiConfig']:
        try:
            config = cls.objects.get(is_active=True)
        except cls.DoesNotExist:
            return None
        return config

    class Meta:
        db_table = 'ui_config'
        verbose_name = 'Конфигурация интерфейса'
        verbose_name_plural = 'Конфигурации интерфейса'
