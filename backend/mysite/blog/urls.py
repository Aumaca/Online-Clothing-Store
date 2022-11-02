from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from mysite import settings

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

app_name = 'blog'

urlpatterns = [
    ### Data ###
    path('api/categories/', views.CategoryList.as_view()),
    path('api/category-details/<int:pk>/', views.CategoryDetail.as_view()),
    path('api/category-products/<int:pk>/', views.CategoryProducts.as_view()),
    path('api/messages/', views.MessagesList.as_view()),
    path('api/slides/', views.SlidesList.as_view()),
    path('api/home-cards/', views.HomeCardList.as_view()),
    path('api/products/', views.ProductList.as_view()),
    path('api/search_products/<slug:slug>/', views.SearchProductList.as_view()),
    path('api/product/<int:pk>/', views.ProductDetails.as_view()),
    path('api/get-items-in-cart-from-account/', views.GetItemsCart.as_view()),

    ### Validation ###
    path('api/validation-for-newsletter/',
         views.NewsletterEmailCreate.as_view()),

    ### JWT/USER AUTH ###
    path('api/user/register/', views.Register.as_view()),
    path('api/user/login/', views.Login.as_view()),
    path('api/user/me/', views.User.as_view()),
    path('api/user/refresh/', TokenRefreshView.as_view()),
    path('api/user/verify/', TokenVerifyView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
