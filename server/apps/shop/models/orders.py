from django.core.validators import MinValueValidator
from django.db import models, transaction
from phonenumber_field.modelfields import PhoneNumberField

from shop.models.carts import Cart


class Order(models.Model):
    """
    Заказ покупателя
    """
    phone_number: str = PhoneNumberField(verbose_name='Номер телефона')
    email: str = models.EmailField(verbose_name='Email')

    def __str__(self) -> str:
        return f'Заказ {self.pk}'

    @classmethod
    @transaction.atomic
    def create_from_cart(
            cls,
            cart: Cart,
            phone_number: str,
            email: str
    ) -> 'Order':
        order = cls.objects.create(phone_number=phone_number, email=email)
        cls.order_items_fabric(order, cart)
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

    @property
    def total_price(self) -> float:
        result = self.items.aggregate(
            total=models.Sum(
                models.F('price') * models.F('count'),
                output_field=models.FloatField()
            )
        )
        return result.get('total') or 0.0

    class Meta:
        db_table = 'orders'
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderItem(models.Model):
    """
    Товар в заказе покупателя
    """
    title: str = models.CharField(max_length=63, verbose_name='Название товара')
    price: float = models.FloatField(verbose_name='Цена', validators=[MinValueValidator(1.0)])
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

    def total_price(self) -> float:
        return self.price * self.count

    class Meta:
        db_table = 'order_items'
        verbose_name = 'Элемент заказа'
        verbose_name_plural = 'Элементы заказов'
        constraints = [
            models.UniqueConstraint(
                fields=('title', 'order'),
                name='unique_title_order'
            )
        ]
