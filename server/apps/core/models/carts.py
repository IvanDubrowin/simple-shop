from django.contrib.sessions.models import Session
from django.core.validators import MinValueValidator
from django.db import models
from rest_framework.request import Request

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

    def __str__(self) -> str:
        return f'Корзина {self.pk}'

    @classmethod
    def get_current_cart(cls, request: Request) -> 'Cart':
        if not request.session.session_key:
            request.session.save()
        session_id = request.session.session_key
        cart, _ = cls.objects.get_or_create(session_id=session_id)
        return cart

    @property
    def total_price(self) -> float:
        result = self.products.annotate(
            price=models.ExpressionWrapper(
                models.F('product__price') * models.F('count'),
                output_field=models.FloatField()
            )
        ).aggregate(total=models.Sum('price'))
        return result.get('total') or 0.0

    class Meta:
        db_table = 'carts'
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class CartItem(models.Model):
    """
    Элемент корзины
    """
    cart: Cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='products',
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

    def __str__(self) -> str:
        return f'{self.product.title} в корзине {self.cart.pk}'

    class Meta:
        db_table = 'cart_items'
        verbose_name = 'Элемент Корзины'
        verbose_name_plural = 'Элементы корзины'
        constraints = [
            models.UniqueConstraint(
                fields=('cart', 'product'),
                name='unique_cart_product'
            )
        ]
