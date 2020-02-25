from django.db.models.query import QuerySet
from rest_framework.filters import BaseFilterBackend
from rest_framework.request import Request
from rest_framework.views import APIView


class IsPublishedFilter(BaseFilterBackend):
    def filter_queryset(
            self,
            request: Request,
            queryset: QuerySet,
            view: APIView
    ) -> QuerySet:
        return queryset.filter(is_published=True)
