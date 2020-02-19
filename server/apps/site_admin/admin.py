from django.contrib import admin

from core.models import Carousel


@admin.register(Carousel)
class CarouselAdmin(admin.ModelAdmin):
    pass
