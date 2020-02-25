from rest_framework.permissions import BasePermission
from rest_framework.request import Request

from ui.models import UiConfig


class ActiveUiConfigIsReady(BasePermission):
    def has_permission(self, request: Request, view) -> bool:
        if UiConfig.get_active_config():
            return True
        return False
