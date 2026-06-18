# MySQL 增删改查完整案例

## 📦 项目配置

### 1. 安装依赖

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

### 2. 数据库配置

已在 `.env` 文件中配置：

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Admin123
DB_DATABASE=nest_db
DB_SYNC=true
```

### 3. 创建数据库

登录 MySQL 并创建数据库：

```sql
CREATE DATABASE IF NOT EXISTS nest_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## 🏗️ 项目结构

```
src/
├── common/
│   └── utils/
│       └── base.service.ts          # 基础 Service 类（封装通用 CRUD）
├── database/
│   └── database.module.ts           # 数据库模块配置
└── modules/
    └── product/                     # 商品模块（完整示例）
        ├── entities/
        │   └── product.entity.ts    # 商品实体
        ├── dto/
        │   ├── create-product.dto.ts   # 创建 DTO
        │   ├── update-product.dto.ts   # 更新 DTO
        │   └── query-product.dto.ts    # 查询 DTO
        ├── product.controller.ts    # 控制器
        ├── product.service.ts       # 服务
        └── product.module.ts        # 模块
```

## 🎯 核心封装 - BaseService

`BaseService` 是一个泛型基础服务类，封装了所有通用的 CRUD 操作：

### 已封装的方法

| 方法 | 说明 |
|------|------|
| `create(dto)` | 创建记录 |
| `findById(id)` | 根据 ID 查找 |
| `findOne(where)` | 根据条件查找单条 |
| `findAll(options)` | 查找所有记录 |
| `findPage(page, pageSize, options)` | 分页查询 |
| `update(id, dto)` | 更新记录 |
| `delete(id)` | 删除记录 |
| `batchDelete(ids)` | 批量删除 |
| `count(where)` | 统计记录数 |
| `exists(where)` | 检查记录是否存在 |

### 使用示例

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/utils/base.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository); // 继承基础服务
  }

  // 直接使用继承的方法，或者添加自定义业务逻辑
}
```

## 📡 API 接口文档

### 1. 创建商品

**请求：**
```http
POST /product
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "最新款 iPhone",
  "price": 7999.00,
  "stock": 100,
  "category": "手机",
  "status": "active"
}
```

**响应：**
```json
{
  "code": 200,
  "message": "创建商品成功",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "最新款 iPhone",
    "price": "7999.00",
    "stock": 100,
    "status": "active",
    "category": "手机",
    "createdAt": "2023-02-17T10:00:00.000Z",
    "updatedAt": "2023-02-17T10:00:00.000Z"
  },
  "timestamp": 1676630400000
}
```

### 2. 查询商品列表（分页 + 条件查询）

**请求：**
```http
GET /product?page=1&pageSize=10&name=iPhone&status=active&category=手机&minPrice=5000&maxPrice=10000
```

**参数说明：**
- `page`: 页码（默认 1）
- `pageSize`: 每页数量（默认 10）
- `name`: 商品名称（模糊搜索）
- `status`: 商品状态（active/inactive）
- `category`: 商品分类
- `minPrice`: 最低价格
- `maxPrice`: 最高价格

**响应：**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "iPhone 15 Pro",
        "description": "最新款 iPhone",
        "price": "7999.00",
        "stock": 100,
        "status": "active",
        "category": "手机",
        "createdAt": "2023-02-17T10:00:00.000Z",
        "updatedAt": "2023-02-17T10:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  },
  "timestamp": 1676630400000
}
```

### 3. 获取商品详情

**请求：**
```http
GET /product/1
```

**响应：**
```json
{
  "code": 200,
  "message": "获取商品详情成功",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "最新款 iPhone",
    "price": "7999.00",
    "stock": 100,
    "status": "active",
    "category": "手机",
    "createdAt": "2023-02-17T10:00:00.000Z",
    "updatedAt": "2023-02-17T10:00:00.000Z"
  },
  "timestamp": 1676630400000
}
```

### 4. 更新商品

**请求：**
```http
PUT /product/1
Content-Type: application/json

{
  "price": 7499.00,
  "stock": 80,
  "description": "降价促销"
}
```

**响应：**
```json
{
  "code": 200,
  "message": "更新商品成功",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "降价促销",
    "price": "7499.00",
    "stock": 80,
    "status": "active",
    "category": "手机",
    "createdAt": "2023-02-17T10:00:00.000Z",
    "updatedAt": "2023-02-17T11:00:00.000Z"
  },
  "timestamp": 1676634000000
}
```

### 5. 删除商品

**请求：**
```http
DELETE /product/1
```

**响应：**
```json
{
  "code": 200,
  "message": "删除商品成功",
  "data": null,
  "timestamp": 1676634000000
}
```

### 6. 批量删除商品

**请求：**
```http
DELETE /product/batch/delete
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

**响应：**
```json
{
  "code": 200,
  "message": "批量删除商品成功",
  "data": null,
  "timestamp": 1676634000000
}
```

### 7. 更新商品状态

**请求：**
```http
PUT /product/1/status
Content-Type: application/json

{
  "status": "inactive"
}
```

**响应：**
```json
{
  "code": 200,
  "message": "更新商品状态成功",
  "data": {
    "id": 1,
    "status": "inactive",
    ...
  },
  "timestamp": 1676634000000
}
```

### 8. 更新商品库存

**请求：**
```http
PUT /product/1/stock
Content-Type: application/json

{
  "stock": 50
}
```

**响应：**
```json
{
  "code": 200,
  "message": "更新商品库存成功",
  "data": {
    "id": 1,
    "stock": 50,
    ...
  },
  "timestamp": 1676634000000
}
```

## 🔥 如何创建新的模块

基于 BaseService，创建新模块非常简单：

### 1. 创建实体

```typescript
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;
}
```

### 2. 创建 Service（继承 BaseService）

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/utils/base.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  // 所有基础 CRUD 方法已自动继承
  // 可以添加自定义业务方法
}
```

### 3. 创建 Controller

```typescript
// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUtil } from '../../common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: any) {
    const user = await this.userService.create(body);
    return ResponseUtil.success(user, '创建成功');
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return ResponseUtil.success(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return ResponseUtil.success(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const user = await this.userService.update(id, body);
    return ResponseUtil.success(user, '更新成功');
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.delete(id);
    return ResponseUtil.success(null, '删除成功');
  }
}
```

## ✨ 最佳实践

### 1. 参数验证

在 Service 层进行业务验证：

```typescript
async createProduct(dto: CreateProductDto): Promise<Product> {
  // 参数验证
  if (!dto.name) {
    throw BusinessException.paramsError('商品名称不能为空');
  }
  
  if (dto.price < 0) {
    throw BusinessException.paramsError('价格不能为负数');
  }
  
  // 业务逻辑验证
  const exists = await this.exists({ name: dto.name } as any);
  if (exists) {
    throw BusinessException.paramsError('商品名称已存在');
  }
  
  return await this.create(dto);
}
```

### 2. 复杂查询

使用 TypeORM 查询构建器：

```typescript
async searchProducts(keyword: string) {
  return await this.productRepository
    .createQueryBuilder('product')
    .where('product.name LIKE :keyword', { keyword: `%${keyword}%` })
    .orWhere('product.description LIKE :keyword', { keyword: `%${keyword}%` })
    .andWhere('product.status = :status', { status: 'active' })
    .orderBy('product.createdAt', 'DESC')
    .getMany();
}
```

### 3. 事务处理

```typescript
import { DataSource } from 'typeorm';

async transferStock(fromId: number, toId: number, quantity: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // 减少源商品库存
    await queryRunner.manager.decrement(
      Product,
      { id: fromId },
      'stock',
      quantity,
    );

    // 增加目标商品库存
    await queryRunner.manager.increment(
      Product,
      { id: toId },
      'stock',
      quantity,
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

## 🚀 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run start:dev
```

访问 `http://localhost:3008/product` 测试接口。

## 📝 测试数据

使用以下 SQL 插入测试数据：

```sql
INSERT INTO products (name, description, price, stock, status, category, createdAt, updatedAt)
VALUES
('iPhone 15 Pro', '最新款 iPhone', 7999.00, 100, 'active', '手机', NOW(), NOW()),
('MacBook Pro', '14英寸 M3 芯片', 15999.00, 50, 'active', '电脑', NOW(), NOW()),
('AirPods Pro', '主动降噪耳机', 1999.00, 200, 'active', '耳机', NOW(), NOW());
```

## 🔧 常见问题

### 1. 数据库连接失败

检查 `.env` 配置和 MySQL 服务是否启动。

### 2. 表不存在

确保 `DB_SYNC=true`，TypeORM 会自动创建表。

### 3. 时区问题

在数据库配置中已设置 `timezone: '+08:00'`。
