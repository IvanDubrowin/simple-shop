from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.viewsets import UiConfigViewSet

router = DefaultRouter()
router.register('configs', UiConfigViewSet, basename='configs')

urlpatterns = [
    path('', include(router.urls)),
]
