from math import prod
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers

from django.http import Http404


class CategoryList(APIView):
    def get(self, request, format=None):
        serializer = serializers.CategorySerializer(
            models.Category.objects.all(), many=True)
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
        serializer = serializers.ProductSerializer(
            models.Product.objects.all(), context={'request': request}, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class ProductDetail(APIView):
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
