from django.contrib import admin

from core.models import Carousel, ContactInfo, Content, UiConfig


@admin.register(Carousel)
class CarouselAdmin(admin.ModelAdmin):
    pass


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    pass


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    pass


@admin.register(UiConfig)
class UiConfigAdmin(admin.ModelAdmin):
    pass
