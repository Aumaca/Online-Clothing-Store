from django.test import TestCase
from rest_framework import status

# Create your tests here.


# Data to newsletter testing
class NewsletterEmailTests(TestCase):
    def test_store_newsletter_data(self):
        name = "James Edwin Webb"
        email = "jameedwin1906@outlook.com"

        data = {"name": name, "email": email}
        url = '/api/validate-for-newsletter/'
        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
