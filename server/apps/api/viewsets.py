from django.db.models.query import QuerySet
from django.http import Http404
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.filters import CurrentUiConfigFilter
from api.serializers import (CategorySerializer, ProductSerializer,
                             UiConfigSerializer)
from core.models import Category, Product, UiConfig


class UiConfigViewSet(GenericViewSet):
    """
    Api конфигураций интерфейса сайта
    """
    queryset = UiConfig.objects.select_related('carousel', 'contact_info', 'content')
    serializer_class = UiConfigSerializer

    @action(methods=['GET'], detail=False, filter_backends=(CurrentUiConfigFilter,))
    def current(self, request: Request) -> Response:
        config = self.get_current_config()
        serializer = self.get_serializer(config)
        return Response(serializer.data)

    def get_current_config(self) -> UiConfig:
        queryset = self.filter_queryset(self.get_queryset())
        config = queryset.first()
        if not config:
            raise Http404
        return config


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
