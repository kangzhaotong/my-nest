# 安装和运行指南

## 📦 1. 安装依赖

### 安装 MySQL 相关依赖

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

或使用 yarn：

```bash
yarn add @nestjs/typeorm typeorm mysql2
```

## 🗄️ 2. 配置数据库

### 2.1 确保 MySQL 服务运行

检查 MySQL 是否运行：

```bash
mysql --version
```

启动 MySQL 服务（如果未运行）：

```bash
# macOS (使用 Homebrew)
brew services start mysql

# Linux
sudo service mysql start

# Windows
net start MySQL
```

### 2.2 创建数据库

登录 MySQL：

```bash
mysql -u root -p
# 输入密码: Admin123
```

执行以下 SQL：

```sql
CREATE DATABASE IF NOT EXISTS nest_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
exit;
```

或者直接执行初始化脚本：

```bash
mysql -u root -pAdmin123 < sql/init.sql
```

### 2.3 验证配置

已在 `.env` 文件中配置数据库连接：

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Admin123
DB_DATABASE=nest_db
DB_SYNC=true
```

## 🚀 3. 启动项目

### 开发模式（热重载）

```bash
npm run start:dev
```

### 生产模式

```bash
# 编译
npm run build

# 启动
npm run start:prod
```

## 🧪 4. 测试接口

### 使用 curl 测试

#### 创建商品

```bash
curl -X POST http://localhost:3008/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试商品",
    "description": "这是一个测试商品",
    "price": 99.99,
    "stock": 100,
    "category": "测试分类",
    "status": "active"
  }'
```

#### 查询商品列表

```bash
curl http://localhost:3008/product?page=1&pageSize=10
```

#### 查询商品详情

```bash
curl http://localhost:3008/product/1
```

#### 更新商品

```bash
curl -X PUT http://localhost:3008/product/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 89.99,
    "stock": 80
  }'
```

#### 删除商品

```bash
curl -X DELETE http://localhost:3008/product/1
```

### 使用 Postman 或 Insomnia

导入以下接口进行测试：

- **基础 URL**: `http://localhost:3008`
- **接口列表**: 查看 `docs/MYSQL_CRUD_GUIDE.md`

## 📊 5. 查看数据

### 使用 MySQL 客户端

```bash
mysql -u root -pAdmin123

USE nest_db;

-- 查看所有表
SHOW TABLES;

-- 查看商品表结构
DESC products;

-- 查看所有商品
SELECT * FROM products;

-- 查看表数据统计
SELECT 
  category, 
  COUNT(*) as count, 
  SUM(stock) as total_stock,
  AVG(price) as avg_price
FROM products 
GROUP BY category;
```

### 使用 GUI 工具

推荐使用以下工具：

- **MySQL Workbench** (官方)
- **DBeaver** (免费，跨平台)
- **Navicat** (付费)
- **TablePlus** (macOS，付费)

**连接信息：**
- Host: localhost
- Port: 3306
- Username: root
- Password: Admin123
- Database: nest_db

## 🐛 6. 常见问题

### 问题 1: 无法连接数据库

**错误信息：** `ER_ACCESS_DENIED_ERROR` 或 `ECONNREFUSED`

**解决方案：**
1. 检查 MySQL 服务是否运行
2. 验证用户名和密码是否正确
3. 检查 `.env` 文件配置

```bash
# 测试连接
mysql -u root -pAdmin123 -e "SELECT 1;"
```

### 问题 2: 数据库不存在

**错误信息：** `Unknown database 'nest_db'`

**解决方案：**

```bash
mysql -u root -pAdmin123 -e "CREATE DATABASE nest_db;"
```

### 问题 3: TypeORM 无法同步表结构

**错误信息：** 表不存在或结构不匹配

**解决方案：**
1. 确保 `.env` 中 `DB_SYNC=true`
2. 删除数据库重新创建
3. 或手动执行 `sql/init.sql`

### 问题 4: 端口冲突

**错误信息：** `Port 3008 is already in use`

**解决方案：**

修改 `src/main.ts` 中的端口：

```typescript
const port = 3009; // 改为其他端口
await app.listen(port);
```

### 问题 5: 依赖安装失败

**解决方案：**

```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

## 📚 7. 下一步

- 查看完整 API 文档：`docs/MYSQL_CRUD_GUIDE.md`
- 查看公共方法使用：`docs/COMMON_USAGE_GUIDE.md`
- 查看代码示例：`src/modules/product/`

## 🎉 完成！

现在你已经成功配置并运行了带有 MySQL 的 NestJS 项目，可以开始使用完整的增删改查功能了！
