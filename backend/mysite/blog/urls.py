from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from mysite import settings

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

app_name = 'blog'

urlpatterns = [
    ### Data ###
    path('api/categories/', views.CategoryList.as_view()),
    path('api/category-details/<int:pk>', views.CategoryDetail.as_view()),
    path('api/category-products/<int:pk>', views.CategoryProducts.as_view()),
    path('api/messages/', views.MessagesList.as_view()),
    path('api/slides/', views.SlidesList.as_view()),
    path('api/home-cards/', views.HomeCardList.as_view()),
    path('api/products/', views.ProductList.as_view()),
    path('api/product-details/<int:pk>', views.ProductDetails.as_view()),
    path('api/get-items-in-cart-from-account/', views.GetItemsCart.as_view()),

    ### Validation ###
    path('api/validation-for-newsletter/',
         views.NewsletterEmailCreate.as_view()),
    path('api/validation-to-login/', views.Login.as_view()),
    path('api/validation-to-register/', views.Register.as_view()),

    ### JWT ###
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
