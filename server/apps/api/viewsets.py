from django.conf import settings
from django.db.models import F
from django.db.models.query import QuerySet
from django.http import Http404
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from templated_email import send_templated_mail

from api.serializers import (CartItemDetailSerializer, CartItemEditSerializer,
                             CategorySerializer, ProductSerializer,
                             UiConfigSerializer)
from core.models import Cart, CartItem, Category, Product, UiConfig


class UiConfigViewSet(GenericViewSet):
    """
    Api конфигураций интерфейса сайта
    """
    queryset = UiConfig.objects.select_related('carousel', 'contact_info', 'content')
    serializer_class = UiConfigSerializer

    @action(methods=['GET'], detail=False)
    def active(self, request: Request) -> Response:
        config = UiConfig.get_active_config()
        if not config:
            raise Http404
        serializer = self.get_serializer(config)
        return Response(serializer.data)


class CategoryViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """
    Api категорий товара
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RelatedProductViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """
    Api товаров связанных с конкретной категорией
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self) -> QuerySet:
        queryset = super().get_queryset()
        category_pk = self.kwargs['category_pk']
        category = get_object_or_404(Category, pk=category_pk)
        return queryset.filter(category=category)


class CartItemViewSet(ModelViewSet):
    """
    Api товаров в корзине пользователя
    """
    queryset = CartItem.objects.all()
    serializer_class = CartItemEditSerializer

    def list(self, request: Request, *args, **kwargs) -> Response:
        self.annotate_queryset()
        self.serializer_class = CartItemDetailSerializer
        return super().list(request, *args, **kwargs)

    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        self.annotate_queryset()
        self.serializer_class = CartItemDetailSerializer
        return super().retrieve(request, *args, **kwargs)

    def annotate_queryset(self) -> None:
        self.queryset = self.queryset.annotate(
            title=F('product__title'),
            price=F('product__price'),
            image=F('product__image')
        )

    def get_queryset(self) -> QuerySet:
        queryset = super().get_queryset()
        cart = Cart.get_current_cart(self.request)
        return queryset.filter(cart=cart)

    @action(methods=['POST'], detail=False)
    def clear(self, request: Request) -> Response:
        cart = Cart.get_current_cart(request)
        cart.products.all().delete()
        return Response({'success': 'Корзина очищена'})

    @action(methods=['POST'], detail=False)
    def create_order(self, request: Request) -> Response:
        self.notify_seller(context={})
        return Response({'success': 'Заказ отправлен'})

    @staticmethod
    def send_mail_to_customer(customer_email: str, context: dict) -> None:
        pass

    @staticmethod
    def notify_seller(context: dict) -> None:
        config = UiConfig.get_active_config()
        send_templated_mail(
            template_name='order',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[config.contact_info.email],
            context=context
        )
