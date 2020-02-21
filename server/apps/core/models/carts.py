from django.contrib.sessions.models import Session
from django.core.validators import MinValueValidator
from django.db import models

from core.models.products import Product


class Cart(models.Model):
    """
    Корзина товаров
    """
    session: Session = models.OneToOneField(
        Session,
        on_delete=models.CASCADE,
        related_name='cart',
        verbose_name='Сессия пользователя'
    )

    class Meta:
        db_table = 'carts'
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'

    def __str__(self) -> str:
        return f'Корзина {self.pk}'


class CartItem(models.Model):
    """
    Элемент корзины
    """
    cart: Cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='cart_items',
        verbose_name='Корзина'
    )
    product: Product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='cart_items',
        verbose_name='Товар'
    )
    count: int = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name='Количество товара'
    )

    class Meta:
        db_table = 'cart_items'
        verbose_name = 'Элемент Корзины'
        verbose_name_plural = 'Элементы корзины'

    def __str__(self) -> str:
        return f'{self.product.title} в корзине {self.cart.pk}'
