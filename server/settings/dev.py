import os

from server.settings.base import Base


class Dev(Base):
    DEBUG = True

    SECRET_KEY = 'super-secret'

    ALLOWED_HOSTS = ['*']

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(Base.BASE_DIR, 'db.sqlite3'),
        }
    }
