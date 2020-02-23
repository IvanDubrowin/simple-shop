import os

from django.conf import settings
from rest_framework.serializers import (HiddenField, ModelSerializer,
                                        SerializerMethodField)
from rest_framework.validators import UniqueTogetherValidator

from core.models import (Carousel, Cart, CartItem, Category, ContactInfo,
                         Content, Product, UiConfig)


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
