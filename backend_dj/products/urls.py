from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, get_products, DetailViewSet, user_login, user_register, user_logout

# 创建路由器并注册视图集
router = DefaultRouter()
router.register(r'details', DetailViewSet, basename='detail')  # /api/products/details/

urlpatterns = [
    path('', get_products, name='get_products'),  # 直接获取产品数据的路由
    path('', include(router.urls)),  # 包含所有ViewSet路由
    path('login/', user_login, name='user_login'),
    path('register/', user_register, name='user_register'),
    path('logout/', user_logout, name='user_logout'),
] 