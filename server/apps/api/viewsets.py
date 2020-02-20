from django.http import Http404
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.filters import CurrentUiConfigFilter
from api.serializers import UiConfigSerializer
from core.models import UiConfig


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

    def get_current_config(self):
        queryset = self.filter_queryset(self.get_queryset())
        config = queryset.first()
        if not config:
            raise Http404
        return config
