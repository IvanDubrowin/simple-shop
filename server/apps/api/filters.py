from django.db.models.query import QuerySet
from rest_framework.filters import BaseFilterBackend
from rest_framework.request import Request
from rest_framework.viewsets import GenericViewSet


class CurrentUiConfigFilter(BaseFilterBackend):
    def filter_queryset(
            self,
            request: Request,
            queryset: QuerySet,
            view: GenericViewSet
    ) -> QuerySet:
        return queryset.filter(is_current=True)
