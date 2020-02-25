import os

from django.conf import settings
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import (HiddenField, ModelSerializer,
                                        SerializerMethodField)
from rest_framework.validators import UniqueTogetherValidator
from templated_email import send_templated_mail

from shop.models import Cart, CartItem, Category, Order, Product
from ui.models import Carousel, ContactInfo, Content, UiConfig


class CarouselSerializer(ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'


class ContactInfoSerializer(ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'


class ContentSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'


class UiConfigSerializer(ModelSerializer):
    carousel = CarouselSerializer(read_only=True)
    contact_info = ContactInfoSerializer(read_only=True)
    content = ContentSerializer(read_only=True)

    class Meta:
        model = UiConfig
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CurrentCart:
    requires_context = True

    def __call__(self, serializer_field):
        return Cart.get_current_cart(serializer_field.context['request'])

    def __repr__(self):
        return '%s()' % self.__class__.__name__


class CartItemEditSerializer(ModelSerializer):
    cart = HiddenField(default=CurrentCart())

    class Meta:
        model = CartItem
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=('cart', 'product')
            )
        ]


class CartItemDetailSerializer(ModelSerializer):
    title = SerializerMethodField()
    price = SerializerMethodField()
    image = SerializerMethodField()

    @staticmethod
    def get_title(cart_item: CartItem) -> str:
        return cart_item.title

    @staticmethod
    def get_price(cart_item: CartItem) -> str:
        return cart_item.price

    @staticmethod
    def get_image(cart_item: CartItem) -> str:
        return os.path.join(settings.MEDIA_URL, cart_item.image)

    class Meta:
        model = CartItem
        exclude = ('cart',)


class OrderCreateSerializer(ModelSerializer):
    cart = HiddenField(default=CurrentCart())

    @staticmethod
    def validate_cart(cart: Cart) -> Cart:
        if cart.products.count() == 0:
            raise ValidationError('Корзина пустая')
        return cart

    def create(self, validated_data: dict) -> Order:
        order = Order.create_from_cart(**validated_data)
        context = {
            'order': order,
            'products': order.items.all(),
            'total': order.total_price
        }
        self.notify_customer(context=context)
        self.notify_seller(context=context)
        return order

    @staticmethod
    def notify_customer(context: dict) -> None:
        send_templated_mail(
            template_name='order',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[context['order'].email],
            context=context,
        )

    @staticmethod
    def notify_seller(context: dict) -> None:
        config = UiConfig.get_active_config()
        send_templated_mail(
            template_name='order',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[config.contact_info.email],
            context=context,
        )

    class Meta:
        model = Order
        fields = '__all__'
