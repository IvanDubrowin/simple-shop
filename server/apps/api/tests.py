import tempfile

from django.core.files import File
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from shop.models import Cart, Category, Product
from ui.models import Carousel, ContactInfo, Content, UiConfig


def get_image_file() -> File:
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    file = tempfile.NamedTemporaryFile(suffix='.png')
    image.save(file)
    return File(file)


def create_ui_config() -> UiConfig:
    image = get_image_file()
    content = Content.objects.create(
        title='test',
        text='test',
        image=image
    )
    carousel = Carousel.objects.create(
        title='test',
        first_image=image,
        second_image=image
    )
    contact_info = ContactInfo.objects.create(
        title='test',
        phone_number='+78005553535',
        email='test@test.com'
    )
    config = UiConfig.objects.create(
        title='test',
        carousel=carousel,
        content=content,
        contact_info=contact_info
    )
    return config


class UiConfigTestCase(APITestCase):
    def test_api_current_config(self) -> None:
        config = create_ui_config()
        response = self.client.get('/api/configs/active/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        config.is_active = True
        config.save()

        response = self.client.get('/api/configs/active/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('content', response.data)
        self.assertIn('carousel', response.data)
        self.assertIn('contact_info', response.data)

    def test_model_save_method(self) -> None:
        config = create_ui_config()
        config.is_active = True
        config.save()
        self.assertEqual(config.is_active, True)

        new_config = create_ui_config()
        new_config.is_active = True
        new_config.save()

        config = UiConfig.objects.get(pk=config.pk)

        self.assertEqual(config.is_active, None)
        self.assertEqual(new_config.is_active, True)


class CategoryTestCase(APITestCase):
    def setUp(self) -> None:
        self.category = Category.objects.create(title='test')

    def test_get_categories(self) -> None:
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_category(self) -> None:
        response = self.client.get('/api/categories/{id}/'.format(id=self.category.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductTestCase(APITestCase):
    def setUp(self) -> None:
        self.category = Category.objects.create(title='test')
        self.product = Product.objects.create(
            title='test',
            price=300.00,
            category=self.category
        )

    def test_get_products(self) -> None:
        response = self.client.get(
            '/api/categories/{id}/products/'.format(id=self.category.pk)
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_product(self) -> None:
        response = self.client.get(
            '/api/categories/{category_id}/products/{product_id}/'.format(
                category_id=self.category.pk,
                product_id=self.product.pk
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CartTestCase(APITestCase):
    def setUp(self) -> None:
        self.category = Category.objects.create(title='test')
        self.product = Product.objects.create(
            title='test',
            price=300.00,
            category=self.category
        )

    def test_get_cart_items(self) -> None:
        response = self.client.get('/api/cart/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_product(self) -> None:
        response = self.client.post(
            '/api/cart/',
            data={'count': 10, 'product': self.product.pk}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_change_cart_item(self) -> None:
        response = self.client.post(
            '/api/cart/',
            data={'count': 10, 'product': self.product.pk}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        cart_item_pk = response.data['id']

        response = self.client.patch(
            '/api/cart/{id}/'.format(id=cart_item_pk),
            data={'count': 20}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        session_id = self.client.session.session_key
        cart = Cart.objects.get(session_id=session_id)
        self.assertEqual(cart.total_price, 6000.0)

    def test_create_order(self) -> None:
        response = self.client.post(
            '/api/cart/',
            data={'count': 10, 'product': self.product.pk}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(
            '/api/cart/create_order/',
            data={'phone_number': '+12125552368', 'email': 'test@test.com'}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        config = create_ui_config()
        config.is_active = True
        config.save()

        response = self.client.post(
            '/api/cart/create_order/',
            data={'phone_number': '+12125552368', 'email': 'test@test.com'}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_clear_cart(self) -> None:
        response = self.client.post('/api/cart/clear/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get('/api/cart/')
        self.assertEqual(response.data, [])
