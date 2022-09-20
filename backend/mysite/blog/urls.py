from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from mysite import settings

app_name = 'blog'

urlpatterns = [
    path('api/categories/', views.CategoryList.as_view()),
    path('api/category-details/<int:pk>', views.CategoryDetail.as_view()),
    path('api/category-products/<int:pk>', views.CategoryProducts.as_view()),
    path('api/messages/', views.MessagesList.as_view()),
    path('api/slides/', views.SlidesList.as_view()),
    path('api/home-cards/', views.HomeCardList.as_view()),
    path('api/products/', views.ProductList.as_view()),
    path('api/product-details/<int:pk>', views.ProductDetails.as_view()),

    path('api/validation-for-newsletter/',
         views.NewsletterEmailCreate.as_view()),
    # Change this after!!!!!!
    path('api/validation-to-login/', views.ProductDetails.as_view()),
    path('api/validation-to-register/', views.RegisterAccount.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
