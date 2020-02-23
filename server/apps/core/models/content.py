from django.db import models
from django.db.models.fields.files import ImageFieldFile

from core.utils import hash_upload


class Content(models.Model):
    """
    Контент главной страницы сайта
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    text: str = models.TextField(verbose_name='Текст')
    image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Изображение')

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'content'
        verbose_name = 'Контент'
        verbose_name_plural = 'Контент'
