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

    class Meta:
        model = models.Slide
        exclude = ['id']


class HomeCardSerializer(serializers.ModelSerializer):

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
                raise serializers.ValidationError('Name is invalid')
        # Return just the first and second name capitalized
        return (" ").join(x.capitalize() for x in name.split(" ")[0:2])

class ProductSerializer(serializers.ModelSerializer):
    image1 = serializers.ImageField(use_url=True)
    image2 = serializers.ImageField(use_url=True)
    image3 = serializers.ImageField(use_url=True)
    type = ProductTypeSerializer()

    class Meta:
        model = models.Product
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ['first_name', 'last_name', 'email', 'password']

    def validate_email(self, email):
        '''
        Checks if email already exists in db.
        '''
        if models.Account.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists.")

        return email

    def validate_password(self, password):
        '''
        Checks if password has more than 8 characters.
        '''
        if len(password) < 8:
            raise serializers.ValidationError(
                "Password has less than 8 characters.")

        return password

    def create(self, validated_data):
        return models.Account.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ['email', 'password']

    def validate_email(self, email):
        '''
        Checks if email exists in db.
        '''
        if not models.Account.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email not registered.")

        return email
