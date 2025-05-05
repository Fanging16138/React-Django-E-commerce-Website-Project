from rest_framework import serializers
from .models import Product, Detail

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'img', 'category', 'title_en', 'title_cn', 'price', 'saled', 'time']

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = '__all__'