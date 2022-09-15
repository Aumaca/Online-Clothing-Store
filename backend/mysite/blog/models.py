from django.db import models

COLOR_CHOICES = (
    ("Green", "Green"),
    ("Red", "Red"),
    ("White", "White"),
    ("Purple", "Purple"),
    ("Yellow", "Yellow"),
    ("Pink", "Pink"),
    ("Black", "Black"),
    ("Orange", "Orange"),
    ("Grey", "Grey"),
)


class ProductType(models.Model):
    name = models.CharField(max_length=35)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=35)
    products = models.ManyToManyField(ProductType, blank=True)
    link = models.TextField()
    index = models.IntegerField()

    class Meta:
        ordering = ['index']

    def __str__(self) -> str:
        return self.name


class Message(models.Model):
    text_message = models.TextField()
    text_color = models.CharField(max_length=15, choices=COLOR_CHOICES)
    background_color = models.CharField(max_length=15, choices=COLOR_CHOICES)
    url = models.TextField(null=True)
    index = models.IntegerField()

    class Meta:
        ordering = ['index']

    def __str__(self) -> str:
        return self.text_message


class Slide(models.Model):
    image = models.ImageField()
    title = models.CharField(blank=True, null=True, max_length=35)
    title_color = models.CharField(max_length=15, choices=COLOR_CHOICES)
    subtitle = models.CharField(blank=True, null=True, max_length=35)
    subtitle_color = models.CharField(max_length=15, choices=COLOR_CHOICES)
    url = models.TextField(null=True)
    index = models.IntegerField(default=0)

    class Meta:
        ordering = ['index']

    def __str__(self) -> str:
        return self.title


class HomeCard(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=35)
    subtitle = models.CharField(max_length=100)
    url = models.TextField()

    def __str__(self) -> str:
        return self.title


class NewsletterEmail(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField(unique=True, max_length=254)

    def __str__(self) -> str:
        return self.email


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256)
    price = models.FloatField()
    new_price = models.FloatField(blank=True, null=True)
    type = models.ForeignKey(ProductType, on_delete=models.DO_NOTHING)
    has_small = models.BooleanField()
    has_medium = models.BooleanField()
    has_large = models.BooleanField()
    infant = models.BooleanField()
    gender = models.CharField(max_length=1, choices=(
        ("W", "Woman"),
        ("M", "Men"),
        ("U", "Unissex"),
    ))
    composition = models.TextField()
    image1 = models.ImageField()
    image2 = models.ImageField()
    image3 = models.ImageField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name
