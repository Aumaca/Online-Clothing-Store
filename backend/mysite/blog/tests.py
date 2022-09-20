from django.test import TestCase
from rest_framework import status

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

        request = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, request, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_getemail(self):
        first_name = 'james'
        last_name = 'webb'
        email = "carlos@gmail.com"
        password = 'carlos123'
        password_confirmation = 'carlos123'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = f'/api/get-email/{data["email"]}'

        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    