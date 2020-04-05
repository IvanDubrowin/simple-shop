from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest

from core.utils import admin_display
from shop.models import Cart, CartItem, Category, Order, OrderItem, Product
from site_admin.forms import (CaptchaAdminAuthenticationForm,
                              ContactInfoAdminForm, ContentAdminForm,
                              ProductAdminForm, UiConfigAdminForm)
from ui.models import Carousel, ContactInfo, Content, UiConfig

admin.AdminSite.login_form = CaptchaAdminAuthenticationForm


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
    form = ContactInfoAdminForm


@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'shorten_text', 'image_tag')
    search_fields = ('title',)
    list_per_page = 10
    form = ContentAdminForm


@admin.register(UiConfig)
class UiConfigAdmin(admin.ModelAdmin):
    list_display = ('title', 'get_is_active', 'carousel', 'content')
    search_fields = ('title',)
    list_per_page = 25
    form = UiConfigAdminForm


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_per_page = 25
    inlines = [
        CartItemInline
    ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    actions = ('unpublish', 'publish')
    list_display = ('title', 'is_published')
    search_fields = ('title',)
    list_per_page = 25

    @admin_display(short_description='Снять с публикации')
    def unpublish(self, request: HttpRequest, queryset: QuerySet) -> None:
        queryset.update(is_published=False)

    @admin_display(short_description='Опубликовать')
    def publish(self, request: HttpRequest, queryset: QuerySet) -> None:
        queryset.update(is_published=True)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    actions = ('unpublish', 'publish')
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
    form = ProductAdminForm

    @admin_display(short_description='Снять с публикации')
    def unpublish(self, request: HttpRequest, queryset: QuerySet) -> None:
        queryset.update(is_published=False)

    @admin_display(short_description='Опубликовать')
    def publish(self, request: HttpRequest, queryset: QuerySet) -> None:
        queryset.update(is_published=True)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'phone_number',
        'email',
        'total_price'
    )
    search_fields = (
        'id',
        'name',
        'phone_number',
        'email'
    )
    list_per_page = 20
    inlines = [
        OrderItemInline
    ]
