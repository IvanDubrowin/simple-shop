import os
import sys

from configurations import Configuration


class Base(Configuration):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django.contrib.humanize',
        'django_cleanup',
        'corsheaders',
        'djrichtextfield',
        'templated_email',
        'rest_framework',
        'phonenumber_field',
        'captcha',
        'core',
        'ui',
        'shop',
        'site_admin',
        'api',
    ]

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = 'server.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [
                os.path.join(BASE_DIR, 'templates')
            ],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'server.wsgi.application'

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    LANGUAGE_CODE = 'ru-ru'

    TIME_ZONE = 'Europe/Moscow'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True

    STATIC_URL = '/static/'

    MEDIA_URL = '/media/'

    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, 'apps/ui/static'),
        os.path.join(BASE_DIR, 'apps/shop/static')
    ]

    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    TEMPLATED_EMAIL_TEMPLATE_DIR = 'email/'

    TEMPLATED_EMAIL_FILE_EXTENSION = 'html'

    DJRICHTEXTFIELD_CONFIG = {
        'js': ['//cdn.ckeditor.com/4.4.4/standard/ckeditor.js'],
        'init_template': 'djrichtextfield/init/ckeditor.js',
        'settings': {
            'toolbar': [
                {'items': ['Format', '-', 'Bold', 'Italic', '-', 'RemoveFormat']},
                {'items': ['Link', 'Unlink', 'Image', 'Table']},
                {'items': ['Source']}
            ],
            'format_tags': 'p;h1;h2;h3',
            'width': 700
        }
    }

    @classmethod
    def post_setup(cls) -> None:
        sys.path.append(os.path.join(cls.BASE_DIR, 'apps'))
