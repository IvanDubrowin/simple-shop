import os
from decimal import Decimal
from textwrap import shorten

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models.fields.files import ImageFieldFile
from django.utils.html import mark_safe

from core.utils import admin_display, hash_upload


class Category(models.Model):
    """
    Категория товара
    """
    title: str = models.CharField(max_length=63, unique=True, verbose_name='Название')
    is_published: bool = models.BooleanField(verbose_name='Опубликовано', default=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'categories'
        verbose_name = 'Категория товаров'
        verbose_name_plural = 'Категории товаров'


class Product(models.Model):
    """
    Модель товара интернет магазина
    """
    title: str = models.CharField(max_length=63, unique=True, verbose_name='Название')
    is_published: bool = models.BooleanField(verbose_name='Опубликовано', default=True)
    is_recommend: bool = models.BooleanField(verbose_name='Рекомендовано', default=False)
    is_top: bool = models.BooleanField(verbose_name='ТОП', default=False)
    category: Category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name='Категория'
    )
    price: Decimal = models.DecimalField(
        verbose_name='Цена',
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1.00)]
    )
    description: str = models.TextField(blank=True, verbose_name='Описание товара')
    image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Изображение', blank=True)

    def __str__(self) -> str:
        return self.title

    @property  # type: ignore
    @admin_display(short_description='Изображение')
    def image_tag(self) -> str:
        if not self.image:
            return 'Нет изображения'
        image_path = os.path.join(settings.MEDIA_URL, self.image.url)
        return mark_safe(f'<img src="{image_path}" width="150" height="150" />')

    @property  # type: ignore
    @admin_display(short_description='Описание товара')
    def shorten_description(self) -> str:
        return shorten(self.description, width=100, placeholder='...')

    class Meta:
        db_table = 'products'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
