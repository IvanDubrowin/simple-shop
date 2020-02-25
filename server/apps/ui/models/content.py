import os
from textwrap import shorten

from django.conf import settings
from django.db import models
from django.db.models.fields.files import ImageFieldFile
from django.utils.html import mark_safe

from core.utils import admin_display, hash_upload


class Content(models.Model):
    """
    Контент главной страницы сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    text: str = models.TextField(verbose_name='Текст')
    image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Изображение')

    def __str__(self) -> str:
        return self.title

    @property  # type: ignore
    @admin_display(short_description='Изображение')
    def image_tag(self) -> str:
        image_path = os.path.join(settings.MEDIA_URL, self.image.url)
        return mark_safe(f'<img src="{image_path}" width="150" height="150" />')

    @property  # type: ignore
    @admin_display(short_description='Текст')
    def shorten_text(self) -> str:
        return shorten(self.text, width=100, placeholder='...')

    class Meta:
        db_table = 'content'
        verbose_name = 'Контент'
        verbose_name_plural = 'Контент'
