from django.db import models

from core.utils import hash_upload


class Category(models.Model):
    """
    Категория товара
    """
    title: str = models.CharField(max_length=63, unique=True, verbose_name='Название')
    is_published: bool = models.BooleanField(verbose_name='Опубликовано', default=True)

    class Meta:
        db_table = 'categories'
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self) -> str:
        return self.title


class Product(models.Model):
    """
    Модель товара интернет магазина
    """
    title: str = models.CharField(max_length=63, unique=True, verbose_name='Название')
    is_published: bool = models.BooleanField(verbose_name='Опубликовано', default=True)
    is_recommend: bool = models.BooleanField(verbose_name='Рекомендовано', default=False)
    is_top: bool = models.BooleanField(verbose_name='TOP', default=False)
    category: Category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name='Категория'
    )
    price: float = models.FloatField(verbose_name='Цена')
    description: str = models.TextField(blank=True, verbose_name='Описание товара')
    image: str = models.ImageField(upload_to=hash_upload, verbose_name='Изображение', null=True)

    class Meta:
        db_table = 'products'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self) -> str:
        return self.title
