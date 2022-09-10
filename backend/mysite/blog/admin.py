from django.contrib import admin
from . import models
admin.site.register(models.Category)
admin.site.register(models.Message)
admin.site.register(models.ProductType)
admin.site.register(models.Slide)
admin.site.register(models.HomeCard)
admin.site.register(models.NewsletterEmail)
