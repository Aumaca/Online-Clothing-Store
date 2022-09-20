from tabnanny import verbose
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager

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
    description = models.TextField()
    composition = models.TextField()
    image1 = models.ImageField()
    image2 = models.ImageField()
    image3 = models.ImageField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name

# https://docs.djangoproject.com/en/dev/topics/auth/customizing/#django.contrib.auth.models.BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError("User must have an email address.")
        if not first_name:
            raise ValueError("User must have an first_name.")
        if not last_name:
            raise ValueError("User must have an last_name.")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        # Makes password hashing
        user.set_password(password)
        # self._db == None, then Django will use the default database.
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True, verbose_name='email')
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    date_joined = models.DateTimeField(
        verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Setting email as unique identifier. The field must have 'unique=True'.
    USERNAME_FIELD = 'email'
    # Setting the fields that are required to create new account.
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = AccountManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
