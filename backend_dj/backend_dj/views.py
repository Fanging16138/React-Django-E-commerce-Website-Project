from django.http import HttpResponse

# 两个按钮，帮助跳转到产品列表，一个跳转到产品详情
def home_view(request):
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>数据后端API导航</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f0f2f5;
            }
            .button-container {
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 10px;
                font-size: 16px;
                color: white;
                background-color: #1890ff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                text-decoration: none;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #40a9ff;
            }
        </style>
    </head>
    <body>
        <div class="button-container">
            <a href="/api/products/" class="button">产品列表数据</a>
            <a href="/api/products/details/" class="button">产品详情页面数据</a>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)