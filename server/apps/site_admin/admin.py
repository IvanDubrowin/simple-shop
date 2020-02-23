from django.contrib import admin

from core.models import (Carousel, Cart, CartItem, Category, ContactInfo,
                         Content, Product, UiConfig)
from site_admin.forms import UiConfigAdminForm


@admin.register(Carousel)
class CarouselAdmin(admin.ModelAdmin):
    list_display = ('title', 'first_image_tag', 'second_image_tag')
    search_fields = ('title',)
    list_per_page = 10


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'shorten_description',
        'phone_number',
        'email',
        'instagram',
        'vk'
    )
    search_fields = (
        'title',
        'phone_number',
        'email',
        'instagram',
        'vk'
    )
    list_per_page = 25


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'shorten_text', 'image_tag')
    search_fields = ('title',)
    list_per_page = 10


@admin.register(UiConfig)
class UiConfigAdmin(admin.ModelAdmin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_current_.boolean = True
        self.is_current_.short_description = 'Активная конфигурация'

    list_display = ('title', 'is_current_', 'carousel', 'content')
    search_fields = ('title',)
    list_per_page = 25
    form = UiConfigAdminForm

    @staticmethod
    def is_current_(config: UiConfig) -> bool:
        if config.is_current is None:
            return False
        return config.is_current


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_per_page = 25


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'count')
    search_fields = ('__str__',)
    list_per_page = 25


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published')
    search_fields = ('title',)
    list_per_page = 25


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'is_published',
        'is_recommend',
        'is_top',
        'category',
        'price',
        'shorten_description',
        'image_tag'
    )
    search_fields = (
        'title',
        'category'
    )
    list_per_page = 10
