import json
import requests

from mysite import settings
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def simple_middleware(get_response):
    '''
    Middleware made to set token to headers authorization in every request.
    If access_token is expired and the the refresh_token is available, new tokens are setted to cookies.
    '''

    def mymiddleware(request):
        access_token = request.COOKIES['access'] if 'access' in request.COOKIES else ''
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
            response = get_response(request)
            return response
        refresh_token = request.COOKIES['refresh'] if 'refresh' in request.COOKIES else ''
        if refresh_token:
            # URL to refresh tokens
            tokens_request = requests.post(
                'http://127.0.0.1:8000/api/user/refresh/',
                data={'refresh': refresh_token}
            )
            # To json for python object
            new_tokens = json.loads(tokens_request.text)
            access_token = new_tokens['access']
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
            response = get_response(request)
            # Access token
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_KEY_ACCESS'],
                value=access_token,
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )
            # Refresh token
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_KEY_REFRESH'],
                value=new_tokens['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )
            return response
        response = get_response(request)
        return response

    return mymiddleware
