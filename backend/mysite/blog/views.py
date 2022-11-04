from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from mysite import settings

from . import models
from . import serializers

from django.http import Http404


class CategoryList(APIView):
    def get(self, request, format=None):
        serializer = serializers.CategorySerializer(
            models.Category.objects.all(), many=True
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return models.Category.objects.get(pk=pk)
        except models.Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = serializers.CategorySerializer(category)
        return Response(serializer.data)


class CategoryProducts(APIView):
    def get_object(self, pk):
        try:
            return models.Category.objects.get(pk=pk)
        except models.Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = serializers.CategoryProductsSerializer(category)
        return Response(serializer.data)


class MessagesList(APIView):
    def get(self, request, format=None):
        serializer = serializers.MessageSerializer(
            models.Message.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SlidesList(APIView):
    def get(self, request, format=None):
        serializer = serializers.SlideSerializer(models.Slide.objects.all(), context={
            'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HomeCardList(APIView):
    def get(self, request, format=None):
        serializer = serializers.HomeCardSerializer(models.HomeCard.objects.all(), context={
            'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NewsletterEmailCreate(APIView):
    def post(self, request):
        serializer = serializers.NewsletterEmailSerializer(data=request.data)
        serializer.validate_name(data=request.data["name"])
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProductList(APIView):
    def get(self, request, format=None):
        gender = self.request.query_params.get('gender')
        type = self.request.query_params.get('type')
        size = self.request.query_params.get('size').lower()

        qs = models.Product.objects.all()  # Queryset

        if gender:
            # iexact to case-insentive filter.
            qs = qs.filter(gender__iexact=gender)

        if type:
            type_id = models.ProductType.objects.get(
                name__iexact=type).id  # Getting the type id
            qs = qs.filter(type=type_id)

        if size:
            if size == 's':
                qs = qs.filter(has_small=True)
            if size == 'm':
                qs = qs.filter(has_medium=True)
            if size == 'l':
                qs = qs.filter(has_large=True)

        serializer = serializers.ProductSerializer(
            qs,
            context={'request': request},   
            many=True
        )

        return Response(serializer.data, status.HTTP_200_OK)


class SearchProductList(APIView):
    '''
    Returns just products with the requested type by the slug.
    '''

    def get_object(self, slug):
        try:
            return models.Product.objects.filter(type__name=slug)
        except models.Product.DoesNotExist:
            return Http404

    def get(self, request, slug, format=None):
        slug = slug.capitalize()  # slug capitalized due to model names being capitalized
        products = self.get_object(slug)
        serializer = serializers.ProductSerializer(
            products,
            context={'request': request},
            many=True
        )
        return Response(serializer.data, status.HTTP_200_OK)


class ProductDetails(APIView):
    def get_object(self, pk):
        try:
            return models.Product.objects.get(pk=pk)
        except models.Product.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = serializers.ProductSerializer(
            product, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)


class GetItemsCart(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):
        content = {
            'status': 'request was permitted'
        }
        return Response(content)


class Register(APIView):
    def post(self, request, format=None):
        serializer = serializers.RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        settings.SIMPLE_JWT['AUTH_COOKIE_KEY_REFRESH']: str(refresh),
        settings.SIMPLE_JWT['AUTH_COOKIE_KEY_ACCESS']: str(refresh.access_token),
    }


class Login(APIView):
    '''
    Takes the user credentials and authenticate.
    Takes the credentials and return tokens,
    that will be inserted in cookies into user browser.
    '''

    def post(self, request, format=None):
        data = request.data
        response = Response()
        email = data["email"]
        password = data["password"]
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                tokens = get_tokens_for_user(user)
                # Access token
                AUTH_COOKIE_KEY_ACCESS = settings.SIMPLE_JWT['AUTH_COOKIE_KEY_ACCESS']
                response.set_cookie(
                    key=AUTH_COOKIE_KEY_ACCESS,
                    value=tokens[AUTH_COOKIE_KEY_ACCESS],
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                    path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                )
                # Refresh token
                AUTH_COOKIE_KEY_REFRESH = settings.SIMPLE_JWT['AUTH_COOKIE_KEY_REFRESH']
                response.set_cookie(
                    key=AUTH_COOKIE_KEY_REFRESH,
                    value=tokens[AUTH_COOKIE_KEY_REFRESH],
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                    path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                )
                response.data = {"Message": "Login was successful"}
                return response
            else:
                return Response({"Message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"Message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class User(APIView):
    '''
    Returns the user data.
    '''

    def get(self, request, format=None):
        try:
            user = request.user
            products_serializer = serializers.ProductSerializer(
                user.products_in_cart,
                many=True
            )
            last_seen_products_serializer = serializers.ProductSerializer(
                user.last_seen_products,
                many=True,
                context={'request': request}
            )
            products_in_cart = products_serializer.data
            last_seen_products = last_seen_products_serializer.data
            user_data = {
                'email': str(user.email),
                'first_name': str(user.first_name),
                'last_name': str(user.last_name),
                'date_joined': f'{user.date_joined.day}/{user.date_joined.month}/{user.date_joined.year}',
                # Return just the products id.
                'products_in_cart': products_in_cart,
                'last_seen_products': last_seen_products,
            }
            return Response(user_data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
