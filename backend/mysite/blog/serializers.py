from rest_framework import serializers
from . import models


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductType
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    products = ProductTypeSerializer(models.ProductType, many=True)

    class Meta:
        model = models.Category
        fields = '__all__'


class CategoryProductsSerializer(serializers.ModelSerializer):
    products = ProductTypeSerializer(models.ProductType, many=True)

    class Meta:
        model = models.Category
        fields = ['products']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = '__all__'


class SlideSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = models.Slide
        exclude = ['id']


class HomeCardSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = models.HomeCard
        exclude = ['id']


class NewsletterEmailSerializer(serializers.ModelSerializer):
    def validate_name(self, data):
        name = data
        for x in name.split(' '):
            if not x.isalpha():
                print(x)
                raise serializers.ValidationError('Name is invalid')
        return data

    class Meta:
        model = models.NewsletterEmail
        fields = '__all__'
        validators = []  # Remove a default "unique together" constraint.
