# ⚡ 快速开始

## 📦 第一步：安装依赖

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

## 🗄️ 第二步：初始化数据库

```bash
# 创建数据库并插入测试数据
mysql -u root -pAdmin123 < sql/init.sql
```

## 🚀 第三步：启动项目

```bash
npm run start:dev
```

## 🧪 第四步：测试接口

### 方式 1: 使用测试脚本

```bash
chmod +x test-api.sh
./test-api.sh
```

### 方式 2: 使用 curl

```bash
# 查询商品列表
curl http://localhost:3008/product

# 获取商品详情
curl http://localhost:3008/product/1

# 创建商品
curl -X POST http://localhost:3008/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "新商品",
    "price": 99.99,
    "stock": 100,
    "category": "测试"
  }'
```

### 方式 3: 在浏览器中访问

```
http://localhost:3008/product?page=1&pageSize=10
```

## 📡 可用的 API 接口

| 接口 | 说明 |
|------|------|
| `GET /product` | 查询商品列表（支持分页和筛选） |
| `GET /product/:id` | 获取商品详情 |
| `POST /product` | 创建商品 |
| `PUT /product/:id` | 更新商品 |
| `DELETE /product/:id` | 删除商品 |

## 📚 查看详细文档

- **完整 API 文档**: [docs/MYSQL_CRUD_GUIDE.md](docs/MYSQL_CRUD_GUIDE.md)
- **安装详细步骤**: [INSTALL.md](INSTALL.md)
- **公共方法使用**: [docs/COMMON_USAGE_GUIDE.md](docs/COMMON_USAGE_GUIDE.md)
- **项目总览**: [README_MYSQL.md](README_MYSQL.md)

## ✅ 验证安装成功

如果看到类似下面的响应，说明安装成功：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "iPhone 15 Pro",
        "price": "7999.00",
        ...
      }
    ],
    "total": 15,
    "page": 1,
    "pageSize": 10,
    "totalPages": 2
  },
  "timestamp": 1676630400000
}
```

## 🎉 开始开发

现在你可以：

1. 查看 `src/modules/product/` 了解完整的增删改查实现
2. 基于 `BaseService` 创建新的模块
3. 使用公共工具类简化开发

祝你开发愉快！ 🚀
