from django.contrib import admin
from . import models


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'index')


class HomecardAdmin(admin.ModelAdmin):
    list_display = ('title', 'url')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('text_message', 'url', 'index')


class NewsletterEmailAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')


class SlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'index')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'gender', 'id')


admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Message, MessageAdmin)
admin.site.register(models.ProductType)
admin.site.register(models.Slide, SlideAdmin)
admin.site.register(models.HomeCard, HomecardAdmin)
admin.site.register(models.NewsletterEmail, NewsletterEmailAdmin)
admin.site.register(models.Product, ProductAdmin)
