from configurations import values

from server.settings.base import Base


class Prod(Base):
    DEBUG = False

    ALLOWED_HOSTS = values.ListValue()

    SECRET_KEY = values.SecretValue()

    DATABASES = values.DatabaseURLValue()

    CORS_ORIGIN_WHITELIST = values.ListValue()

    CORS_ALLOW_CREDENTIALS = True

    CACHES = values.CacheURLValue()

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'api.auth.CsrfExemptSessionAuthentication',
        ],
        'DEFAULT_RENDERER_CLASSES': [
            'rest_framework.renderers.JSONRenderer',
        ]
    }

    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

    EMAIL_USE_TLS = True

    EMAIL_HOST = values.Value()

    EMAIL_HOST_USER = values.Value()

    EMAIL_HOST_PASSWORD = values.SecretValue()

    EMAIL_PORT = values.IntegerValue()
