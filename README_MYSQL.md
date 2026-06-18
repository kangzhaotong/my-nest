# NestJS MySQL 增删改查完整案例

这是一个完整的 NestJS + MySQL + TypeORM 的增删改查案例，包含统一的方法封装和完整的文档。

## 🎯 特性

✅ **MySQL 数据库集成** - 使用 TypeORM
✅ **统一的 BaseService** - 封装所有通用 CRUD 操作
✅ **统一响应格式** - 全局拦截器自动包装
✅ **统一异常处理** - 全局异常过滤器
✅ **完整的工具类** - 验证、加密、日期等
✅ **参数验证** - 完善的业务逻辑验证
✅ **分页查询** - 支持条件筛选和分页
✅ **详细文档** - 包含 API 文档和使用指南

## 📁 项目结构

```
src/
├── common/                       # 公共模块
│   ├── constants/                # 常量定义
│   ├── decorators/               # 装饰器
│   ├── dto/                      # 数据传输对象
│   ├── exceptions/               # 自定义异常
│   ├── filters/                  # 异常过滤器
│   ├── interceptors/             # 拦截器
│   ├── utils/                    # 工具类
│   │   ├── base.service.ts       # 🔥 基础服务类（封装 CRUD）
│   │   ├── crypto.util.ts        # 加密工具
│   │   ├── date.util.ts          # 日期工具
│   │   ├── response.util.ts      # 响应工具
│   │   └── validator.util.ts     # 验证工具
│   └── index.ts                  # 统一导出
├── database/                     # 数据库配置
│   └── database.module.ts        # MySQL 配置模块
├── modules/                      # 业务模块
│   └── product/                  # 🔥 商品模块（完整示例）
│       ├── entities/
│       │   └── product.entity.ts # 商品实体
│       ├── dto/
│       │   ├── create-product.dto.ts   # 创建 DTO
│       │   ├── update-product.dto.ts   # 更新 DTO
│       │   └── query-product.dto.ts    # 查询 DTO
│       ├── product.controller.ts # 控制器（8个接口）
│       ├── product.service.ts    # 服务（继承 BaseService）
│       └── product.module.ts     # 模块
└── main.ts                       # 入口文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
npm install --save @nestjs/typeorm typeorm mysql2
```

### 2. 配置数据库

确保 MySQL 运行在 `localhost:3306`，用户名 `root`，密码 `Admin123`。

创建数据库：

```bash
mysql -u root -pAdmin123 -e "CREATE DATABASE nest_db;"
```

或执行初始化脚本（包含测试数据）：

```bash
mysql -u root -pAdmin123 < sql/init.sql
```

### 3. 启动项目

```bash
npm run start:dev
```

访问：`http://localhost:3008/product`

### 4. 测试接口

使用提供的测试脚本：

```bash
chmod +x test-api.sh
./test-api.sh
```

或使用 curl、Postman、Insomnia 等工具测试。

## 📡 API 接口列表

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/product` | 创建商品 |
| GET | `/product` | 查询商品列表（分页+筛选） |
| GET | `/product/:id` | 获取商品详情 |
| PUT | `/product/:id` | 更新商品 |
| DELETE | `/product/:id` | 删除商品 |
| DELETE | `/product/batch/delete` | 批量删除商品 |
| PUT | `/product/:id/status` | 更新商品状态 |
| PUT | `/product/:id/stock` | 更新商品库存 |

## 📖 核心封装说明

### BaseService - 通用 CRUD 基类

所有 Service 继承 `BaseService`，自动获得以下方法：

```typescript
// 创建
await this.create(data);

// 查询
await this.findById(id);
await this.findOne(where);
await this.findAll(options);
await this.findPage(page, pageSize, options);

// 更新
await this.update(id, data);

// 删除
await this.delete(id);
await this.batchDelete(ids);

// 统计
await this.count(where);
await this.exists(where);
```

### 使用示例

```typescript
@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  // 所有基础方法已自动继承
  // 可以添加业务逻辑
  async createProduct(dto: CreateProductDto) {
    // 参数验证
    if (!dto.name) {
      throw BusinessException.paramsError('商品名称不能为空');
    }
    
    // 调用继承的方法
    return await this.create(dto);
  }
}
```

## 📚 文档

- **[安装指南](INSTALL.md)** - 详细的安装和配置步骤
- **[API 文档](docs/MYSQL_CRUD_GUIDE.md)** - 完整的接口文档和使用说明
- **[公共方法使用](docs/COMMON_USAGE_GUIDE.md)** - 工具类和公共方法说明

## 🔥 快速创建新模块

基于 BaseService，创建新的 CRUD 模块非常简单：

1. 创建 Entity
2. 创建 Service（继承 BaseService）
3. 创建 Controller
4. 注册 Module

详细步骤查看：`docs/MYSQL_CRUD_GUIDE.md`

## 📊 数据库表结构

### products 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 商品ID（主键） |
| name | VARCHAR(100) | 商品名称 |
| description | TEXT | 商品描述 |
| price | DECIMAL(10,2) | 商品价格 |
| stock | INT | 库存数量 |
| status | VARCHAR(50) | 状态（active/inactive） |
| category | VARCHAR(50) | 商品分类 |
| createdAt | DATETIME | 创建时间 |
| updatedAt | DATETIME | 更新时间 |

## 🛠️ 技术栈

- **NestJS** - 服务端框架
- **TypeORM** - ORM 框架
- **MySQL** - 数据库
- **TypeScript** - 编程语言

## 📝 响应格式

所有接口统一返回格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": 1676630400000
}
```

分页响应：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  },
  "timestamp": 1676630400000
}
```

## ❓ 常见问题

查看 [INSTALL.md](INSTALL.md) 中的"常见问题"章节。

## 📄 License

MIT

---

**开发者：** M78.Kangzhaotong  
**创建时间：** 2023-02-17
