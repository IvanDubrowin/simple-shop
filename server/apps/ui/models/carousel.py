import os

from django.conf import settings
from django.db import models
from django.db.models.fields.files import ImageFieldFile
from django.utils.html import mark_safe

from core.utils import admin_display, hash_upload


class Carousel(models.Model):
    """
    Картинки для карусели на главной странице
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    first_image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Первое изображение')
    second_image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Второе изображение')

    def __str__(self) -> str:
        return self.title

    @property  # type: ignore
    @admin_display(short_description='Первое изображение')
    def first_image_tag(self) -> str:
        image_path = os.path.join(settings.MEDIA_URL, self.first_image.url)
        return mark_safe(f'<img src="{image_path}" width="150" height="150" />')

    @property  # type: ignore
    @admin_display(short_description='Второе изображение')
    def second_image_tag(self) -> str:
        image_path = os.path.join(settings.MEDIA_URL, self.second_image.url)
        return mark_safe(f'<img src="{image_path}" width="150" height="150" />')

    class Meta:
        db_table = 'carousels'
        verbose_name = 'Карусель'
        verbose_name_plural = 'Карусели'
