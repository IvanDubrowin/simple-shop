from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models, transaction
from phonenumber_field.modelfields import PhoneNumberField

from core.utils import admin_display
from shop.models.carts import Cart


class Order(models.Model):
    """
    Заказ покупателя
    """
    name: str = models.CharField(max_length=63, verbose_name='Имя покупателя')
    phone_number: str = PhoneNumberField(verbose_name='Номер телефона')
    email: str = models.EmailField(verbose_name='Email')

    def __str__(self) -> str:
        return f'Заказ {self.pk}'

    @classmethod
    @transaction.atomic
    def create_from_cart(
            cls,
            cart: Cart,
            name: str,
            phone_number: str,
            email: str
    ) -> 'Order':
        order = cls.objects.create(
            name=name,
            phone_number=phone_number,
            email=email
        )
        cls.order_items_fabric(order, cart)
        cart.products.all().delete()
        return order

    @staticmethod
    def order_items_fabric(order: 'Order', cart: Cart) -> None:
        cart_items = cart.products.annotate(
                title=models.F('product__title'),
                price=models.F('product__price')
                )
        OrderItem.objects.bulk_create([
            OrderItem(
                title=item.title,
                price=item.price,
                count=item.count,
                order=order
            )
            for item in cart_items
            ])

    @property  # type: ignore
    @admin_display(short_description='Общая сумма')
    def total_price(self) -> Decimal:
        result = self.items.aggregate(
            total=models.Sum(
                models.F('price') * models.F('count'),
                output_field=models.DecimalField()
            )
        )
        return Decimal(round(result.get('total'), 2)) or Decimal(0.00)

    class Meta:
        db_table = 'orders'
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderItem(models.Model):
    """
    Товар в заказе покупателя
    """
    title: str = models.CharField(max_length=63, verbose_name='Название товара')
    price: Decimal = models.DecimalField(
        verbose_name='Цена',
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(1.00)]
    )
    count: int = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name='Количество товара'
    )
    order: Order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name='Заказ'
    )

    def __str__(self) -> str:
        return f'{self.title} в заказе {self.order.pk}'

    @property  # type: ignore
    @admin_display(short_description='Сумма')
    def total_price(self) -> Decimal:
        return Decimal(round(self.price * self.count, 2))

    class Meta:
        db_table = 'order_items'
        verbose_name = 'Элемент заказа'
        verbose_name_plural = 'Элементы заказа'
        constraints = [
            models.UniqueConstraint(
                fields=('title', 'order'),
                name='unique_title_order'
            )
        ]
