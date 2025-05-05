from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    ### help_text用来帮助对应该属性
    img = models.CharField(max_length=255, help_text='图片路径')
    ### charfield 用来存储字符串
    category = models.CharField(max_length=50, help_text='产品类别')
    title_en = models.CharField(max_length=255, help_text='英文标题')
    title_cn = models.CharField(max_length=255, help_text='中文标题')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    ### 小数点后两位
    saled = models.IntegerField(help_text='销量')
    ### 整数
    time = models.DateField(help_text='上架时间')
    ### 日期

    class Meta:
        db_table = 'products'  # 指定表名

    def __str__(self):
        return f"{self.title_cn} ({self.title_en})"

class Detail(models.Model):
    id = models.OneToOneField(
        Product, 
        on_delete=models.CASCADE, 
        primary_key=True,
        db_column='id'  # 指定数据库中的实际列名
    )
    number = models.IntegerField()
    color = models.JSONField()
    size = models.JSONField()
    desc_en = models.TextField()
    desc_cn = models.TextField()
    color_mapping = models.JSONField()

    class Meta:
        db_table = 'detail'  # 指定正确的表名

    def __str__(self):
        return f"Detail for Product {self.id}"