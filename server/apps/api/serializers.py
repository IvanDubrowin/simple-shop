from rest_framework.serializers import ModelSerializer

from core.models import (Carousel, Category, ContactInfo, Content, Product,
                         UiConfig)


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
