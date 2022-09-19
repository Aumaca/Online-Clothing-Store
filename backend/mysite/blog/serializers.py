from django.contrib.auth.models import User
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
    class Meta:
        model = models.NewsletterEmail
        fields = '__all__'

    def validate_name(self, data):
        name = data
        for x in name.split(' ')[0:2]:
            if not x.isalpha():
                print(x)
                raise serializers.ValidationError('Name is invalid')
        # Return just the first and second name capitalized
        return (" ").join(x.capitalize() for x in name.split(" ")[0:2])


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ['first_name', 'last_name', 'email', 'password']

    def capitalize_names(self, data):
        '''
        Validate if names have just alphabetic characters and have more
        than 2 characters and return them capitalized.
        '''
        if len(data["first_name"]) < 2 or not data["first_name"].isalpha():
            raise serializers.ValidationError("First name invalid")
        if len(data["last_name"]) < 2 or not data["last_name"].isalpha():
            raise serializers.ValidationError("Last name invalid")
        data["first_name"] = data["first_name"].capitalize()
        data["last_name"] = data["last_name"].capitalize()

        return True

    def email_already_exists(self, data):
        '''
        Checks if email already exists.
        '''
        if models.Account.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError("Email already exists.")

        return True

    def password_verification(self, data):
        '''
        Checks if the passwords are equal and if them are valid.
        If has more than 8 characters.
        If passwords are equal.
        '''
        password = data["password"]
        password_confirmation = data["password_confirmation"]

        if len(password) < 8:
            raise serializers.ValidationError(
                "The password has less than 8 characters.")

        if password != password_confirmation or len(password) != len(password_confirmation):
            raise serializers.ValidationError("The passwords are not equal.")

        return True

    def create(self, validated_data):
        self.capitalize_names(validated_data)
        return models.Account.objects.create_user(**validated_data)
