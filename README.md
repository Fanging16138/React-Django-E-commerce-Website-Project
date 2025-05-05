# React-Django-E-commerce-Website-Project

# 服装购物网站

这是一个使用 React 和 Django 构建的服装购物网站。

# Following the template project of YouTube's shopping section, the logic is self-written. The data of shopping products comes from Taobao. The partners are purely fictional. 

# 仿照youtube的购物模板项目，逻辑自写，购物产品数据来自淘宝，合作伙伴纯属虚构

## 环境要求

- Python 3.8+
- Node.js 14+
- npm 或 yarn

## 后端设置

1. 创建虚拟环境：
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. 安装依赖：
```bash
pip install -r requirements.txt
```

3. 配置数据库：
- 在 settings.py 中配置数据库连接
- 运行迁移：
```bash
python manage.py migrate
```

4. 启动后端服务器：
```bash
python manage.py runserver
```

## 前端设置

1. 安装依赖：
```bash
npm install
# 或
yarn install
```

2. 启动开发服务器：
```bash
npm start
# 或
yarn start
```

## 项目结构

```
clothes-shopping/
├── backend/           # Django 后端
│   ├── manage.py
│   └── ...
├── frontend/          # React 前端
│   ├── public/
│   ├── src/
│   └── ...
├── requirements.txt   # Python 依赖
└── package.json      # Node.js 依赖
```

## 功能特点

- 用户注册和登录
- 商品浏览和搜索
- 购物车管理
- 订单处理
- 响应式设计

## 开发说明

- 后端 API 文档：http://localhost:8000/api/products/（http://localhost:8000/api/products/details）
- 前端开发服务器：http://localhost:5173/
- 后端开发服务器：http://127.0.0.1:8000/

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT 