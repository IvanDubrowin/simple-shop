import tempfile

from django.core.files import File
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from core.models import Carousel, ContactInfo, Content, UiConfig


class UiConfigTestCase(APITestCase):
    def test_api_current_config(self) -> None:
        config = self.create_ui_config()
        response = self.client.get('/api/configs/current/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        config.is_current = True
        config.save()

        response = self.client.get('/api/configs/current/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('content', response.data)
        self.assertIn('carousel', response.data)
        self.assertIn('contact_info', response.data)

    def test_model_save_method(self) -> None:
        config = self.create_ui_config()
        config.is_current = True
        config.save()
        self.assertEqual(config.is_current, True)

        new_config = self.create_ui_config()
        new_config.is_current = True
        new_config.save()

        config = UiConfig.objects.get(pk=config.pk)

        self.assertEqual(config.is_current, None)
        self.assertEqual(new_config.is_current, True)

    @staticmethod
    def get_image_file() -> File:
        image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
        file = tempfile.NamedTemporaryFile(suffix='.png')
        image.save(file)
        return File(file)

    def create_ui_config(self) -> UiConfig:
        image = self.get_image_file()
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
