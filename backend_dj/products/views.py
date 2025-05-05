from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import connections
from .models import Product, Detail
from .serializers import ProductSerializer, DetailSerializer
from django.conf import settings
import os

@api_view(['GET'])
def get_products(request):
    try:
        # 使用原生SQL查询获取所有产品数据
        with connections['default'].cursor() as cursor:
            cursor.execute("""
                SELECT id, img, category, title_en, title_cn, price, saled, time 
                FROM products
            """)
            # 获取列名
            columns = [col[0] for col in cursor.description]
            # 获取所有行
            rows = cursor.fetchall()
            # 将结果转换为字典列表
            products = []
            for row in rows:
                product_dict = dict(zip(columns, row)) # 将列名和行数据转换为字典
                # 处理图片路径
                if product_dict['img'].startswith('/'):
                    product_dict['img'] = request.build_absolute_uri(settings.STATIC_URL + product_dict['img'].lstrip('/'))
                products.append(product_dict)
            
            return Response({
                "status": "success",
                "message": "数据获取成功",
                "data": products
            })
    except Exception as e:
        return Response({
            "status": "error",
            "message": str(e)
        }, status=500)



### 这下面还没搞懂

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "message": "数据获取成功",
            "data": serializer.data
        })
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        # 获取查询参数
        category = self.request.query_params.get('category', None)
        sort_by = self.request.query_params.get('sort', None)
        
        # 应用分类过滤
        if category:
            queryset = queryset.filter(category=category)
            
        # 应用排序
        if sort_by:
            if sort_by == 'price_asc':
                queryset = queryset.order_by('price')
            elif sort_by == 'price_desc':
                queryset = queryset.order_by('-price')
            elif sort_by == 'saled':
                queryset = queryset.order_by('-saled')
            elif sort_by == 'time':
                queryset = queryset.order_by('-time')
                
        return queryset

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer

    def get_queryset(self):
        queryset = Detail.objects.all()
        number = self.request.query_params.get('number', None)
        if number is not None:
            queryset = queryset.filter(number=number)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": "success",
            "message": "数据获取成功",
            "data": serializer.data
        })

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "status": "success",
            "message": "数据获取成功",
            "data": serializer.data
        })


@api_view(['POST'])
def user_login(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        # 先检查用户是否存在
        if not User.objects.filter(username=username).exists():
            return Response({
                'status': 'error',
                'message': '没有该用户，请注册！'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Django内置的认证功能
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # Django内置的登录功能
            login(request, user)
            return Response({
                'status': 'success',
                'message': '登录成功',
                'data': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            })
        else:
            return Response({
                'status': 'error',
                'message': '密码错误'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        
        # 检查用户名是否已存在
        if User.objects.filter(username=username).exists():
            return Response({
                'status': 'error',
                'message': 'username already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        # 使用Django内置User模型创建用户
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password  # 密码会自动加密
        )
        
        # 自动登录新注册的用户
        login(request, user)
        
        return Response({
            'status': 'success',
            'message': 'register successfully',
            'data': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
        
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_logout(request):
    try:
        logout(request)
        return Response({
            'status': 'success',
            'message': '注销成功'
        })
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)