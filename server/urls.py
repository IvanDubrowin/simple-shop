from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('captcha/', include('captcha.urls')),
    path('djrichtextfield/', include('djrichtextfield.urls')),
    re_path(
        r'^(?!admin|api|captcha|djrichtextfield|static|media).*',
        TemplateView.as_view(template_name='index.html')
    )
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
                   static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
