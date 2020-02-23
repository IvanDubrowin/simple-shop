from django.db import models
from django.db.models.fields.files import ImageFieldFile

from core.utils import hash_upload


class Carousel(models.Model):
    """
    Картинки для карусели на главной странице
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    first_image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Первое изображение')
    second_image: ImageFieldFile = models.ImageField(upload_to=hash_upload, verbose_name='Второе изображение')

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'carousels'
        verbose_name = 'Карусель'
        verbose_name_plural = 'Карусели'
