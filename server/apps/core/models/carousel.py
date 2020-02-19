from django.db import models

from core.utils import hash_upload


class Carousel(models.Model):
    """
    Картинки для карусели на главной странице
    """
    title: str = models.CharField(max_length=255, verbose_name='Название')
    first_image: str = models.ImageField(upload_to=hash_upload, verbose_name='Первая картинка')
    second_image: str = models.ImageField(upload_to=hash_upload, verbose_name='Вторая картинка')

    def __str__(self) -> str:
        return self.title

    class Meta:
        db_table = 'carousels'
        verbose_name = 'Карусель'
        verbose_name_plural = 'Карусели'
