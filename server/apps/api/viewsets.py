from django.db.models.query import QuerySet
from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import (CreateModelMixin, DestroyModelMixin,
                                   ListModelMixin, RetrieveModelMixin)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.filters import IsPublishedFilter
from api.paginators import ProductPagination
from api.permissions import ActiveUiConfigIsReady
from api.serializers import (CartItemDetailSerializer, CartItemEditSerializer,
                             CategorySerializer, OrderCreateSerializer,
                             ProductSerializer, UiConfigSerializer)
from shop.models import Cart, CartItem, Category, Product
from ui.models import UiConfig


class UiConfigViewSet(GenericViewSet):
    """
    Api конфигураций интерфейса сайта
    """
    queryset = UiConfig.objects.select_related('carousel', 'contact_info', 'content')
    serializer_class = UiConfigSerializer

    @method_decorator(cache_page(60 * 60 * 8))
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
    filter_backends = (IsPublishedFilter,)

    @method_decorator(cache_page(60 * 60 * 2))
    def list(self, request: Request, *args, **kwargs) -> Response:
        return super().list(request, *args, **kwargs)

    @method_decorator(cache_page(60 * 60 * 2))
    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        return super().retrieve(request, *args, **kwargs)


class RelatedProductViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """
    Api товаров связанных с конкретной категорией
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (IsPublishedFilter,)
    pagination_class = ProductPagination

    @method_decorator(cache_page(60 * 60 * 2))
    def list(self, request: Request, *args, **kwargs) -> Response:
        return super().list(request, *args, **kwargs)

    @method_decorator(cache_page(60 * 60 * 2))
    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self) -> QuerySet:
        queryset = super().get_queryset()
        category_pk = self.kwargs['category_pk']
        category = get_object_or_404(Category, pk=category_pk)
        return queryset.filter(category=category)


class CartItemViewSet(
    GenericViewSet,
    ListModelMixin,
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin
):
    """
    Api товаров в корзине пользователя
    """
    queryset = CartItem.objects.all()
    serializer_class = CartItemEditSerializer
    lookup_field = 'product_id'

    def list(self, request: Request, *args, **kwargs) -> Response:
        self.annotate_queryset()
        self.serializer_class = CartItemDetailSerializer
        return super().list(request, *args, **kwargs)

    def retrieve(self, request: Request, *args, **kwargs) -> Response:
        self.annotate_queryset()
        self.serializer_class = CartItemDetailSerializer
        return super().retrieve(request, *args, **kwargs)

    def annotate_queryset(self) -> None:
        self.queryset = self.queryset.select_related('product')

    def get_queryset(self) -> QuerySet:
        queryset = super().get_queryset()
        cart = Cart.get_current_cart(self.request)
        return queryset.filter(cart=cart)

    @action(methods=['POST'], detail=False)
    def clear(self, request: Request) -> Response:
        cart = Cart.get_current_cart(request)
        cart.products.all().delete()
        return Response({'success': 'Корзина очищена'})

    @action(
        methods=['POST'],
        detail=False,
        permission_classes=(ActiveUiConfigIsReady,),
        serializer_class=OrderCreateSerializer
    )
    def create_order(self, request: Request) -> Response:
        return super().create(request)
