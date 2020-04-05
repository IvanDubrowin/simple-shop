from rest_framework.authentication import SessionAuthentication
from rest_framework.request import Request


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request: Request) -> None:
        return None
