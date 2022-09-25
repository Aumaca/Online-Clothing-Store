import json
from django.test import TestCase
from rest_framework import status
from .models import Account

# Create your tests here.


# Data to newsletter testing
class NewsletterEmailTests(TestCase):
    '''
    Testing if register to newsletter return HTTP_201
    '''

    def test_store_newsletter_data(self):
        name = "James Edwin Webb"
        email = "jameedwin1906@outlook.com"

        data = {"name": name, "email": email}
        url = '/api/validation-for-newsletter/'
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class RegisterAccountTest(TestCase):
    '''
    Testing if register return HTTP_201_CREATED receiving valid data.
    '''

    def test_data(self):
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906@outlook.com"
        password = 'j@meswebbpassword'
        password_confirmation = 'j@meswebbpassword'

        request = {"first_name": first_name, "last_name": last_name, "email": email,
                   "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'
        response = self.client.post(url, request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_password(self):
        '''
        Return HTTP 400 due invalid password length (length < 8).
        '''
        first_name = 'james'
        last_name = 'webb'
        email = "jameedwin1906@outlook.com"
        password = 'james1'
        password_confirmation = 'james1'

        data = {"first_name": first_name, "last_name": last_name, "email": email,
                "password": password, "password_confirmation": password_confirmation}
        url = '/api/validation-to-register/'

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginAccountTest(TestCase):
    user_data = {"first_name": "New", "last_name": "User",
                 "email": "newuser@gmail.com", "password": "newuser123"}

    # Is called by django before tests.
    def setUp(self):
        '''
        Creates new user in tests database.
        '''
        new_user = Account.objects.create_user(
            first_name=self.user_data["first_name"],
            last_name=self.user_data["last_name"],
            email=self.user_data["email"],
            password=self.user_data["password"],
        )
        new_user.save()

    def test_get_token(self):
        '''
        Verifying if 'access' token is been returned.
        '''
        data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        url = '/api/token/'

        response = self.client.post(url, data)
        result = json.loads(response.content)
        self.assertTrue("access" in result)

    def test_invalid_login(self):
        '''
        Return HTTP_401_UNAUTHORIZED due invalid credentials.
        '''
        email = "jameedwin1906@outlook.com"
        password = 'james123'

        data = {"email": email, "password": password}
        url = '/api/token/'

        response = self.client.post(url, data)

        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
