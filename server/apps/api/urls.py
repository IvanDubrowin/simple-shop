from django.urls import include, path
from rest_framework_nested import routers

from api.viewsets import (CategoryViewSet, RelatedProductViewSet,
                          UiConfigViewSet)

router = routers.DefaultRouter()
router.register('configs', UiConfigViewSet, basename='configs')
router.register('categories', CategoryViewSet, basename='categories')

category_router = routers.NestedDefaultRouter(router, 'categories', lookup='category')
category_router.register('products', RelatedProductViewSet, basename='products')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(category_router.urls)),
]
