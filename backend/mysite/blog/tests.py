from sqlite3 import DataError
from django.test import TestCase
from rest_framework import status

from blog.serializers import AccountSerializer

# Create your tests here.


# Data to newsletter testing
class NewsletterEmailTests(TestCase):
    def test_store_newsletter_data(self):
        name = "James Edwin Webb"
        email = "jameedwin1906@outlook.com"

        data = {"name": name, "email": email}
        url = '/api/validation-for-newsletter/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class RegisterAccountTest(TestCase):
    def test_data(self):
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906@outlook.com"
        password = 'j@meswebbpassword'
        password_confirmation = 'j@meswebbpassword'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_names(self):
        first_name = 'j'
        last_name = 'w'
        email = "jameedwin1906@outlook.com"
        password = 'j@meswebbpassword'
        password_confirmation = 'j@meswebbpassword'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_passwords_characters(self):
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906@outlook.com"
        password = 'james'
        password_confirmation = 'james'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_passwords_equal(self):
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906@outlook.com"
        password = 'j@meswebbpassword'
        password_confirmation = 'jameswebb'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_email(self):
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906outlook.com"
        password = 'j@meswebbpassword'
        password_confirmation = 'jameswebb'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
