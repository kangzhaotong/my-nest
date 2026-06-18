# 公共方法封装使用说明

## 目录结构

```
src/common/
├── constants/          # 常量定义
│   └── error-code.constant.ts
├── decorators/         # 自定义装饰器
│   └── api-response.decorator.ts
├── dto/               # 数据传输对象
│   └── response.dto.ts
├── exceptions/        # 自定义异常
│   └── business.exception.ts
├── filters/           # 异常过滤器
│   └── http-exception.filter.ts
├── interceptors/      # 拦截器
│   └── transform.interceptor.ts
├── utils/             # 工具类
│   ├── crypto.util.ts
│   ├── date.util.ts
│   ├── response.util.ts
│   └── validator.util.ts
├── index.ts           # 统一导出
└── README.md          # 使用说明
```

## 使用示例

### 1. 在 main.ts 中全局注册拦截器和过滤器

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor, HttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 注册全局拦截器（统一响应格式）
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局异常过滤器（统一异常处理）
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
```

### 2. 在 Controller 中使用 ResponseUtil

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResponseUtil, BusinessException } from '../common';

@Controller('user')
export class UserController {
  // 方式1: 直接返回数据（拦截器会自动包装）
  @Get('list')
  async getUserList() {
    const users = await this.userService.findAll();
    return users; // 自动包装为统一格式
  }

  // 方式2: 使用 ResponseUtil 手动包装
  @Get('info')
  async getUserInfo() {
    const user = await this.userService.findOne();
    return ResponseUtil.success(user, '获取用户信息成功');
  }

  // 方式3: 使用 ResponseUtil 返回分页数据
  @Get('page')
  async getUserPage() {
    const { list, total } = await this.userService.findPage();
    return ResponseUtil.page(list, total, 1, 10);
  }

  // 抛出业务异常
  @Post('create')
  async createUser(@Body() data: any) {
    if (!data.name) {
      throw BusinessException.paramsError('用户名不能为空');
    }
    return await this.userService.create(data);
  }
}
```

### 3. 使用工具类

```typescript
import { ValidatorUtil, CryptoUtil, DateUtil } from '../common';

// 验证工具
ValidatorUtil.isEmail('test@example.com'); // true
ValidatorUtil.isPhone('13800138000'); // true
ValidatorUtil.isEmpty(null); // true

// 加密工具
CryptoUtil.md5('password'); // 加密密码
CryptoUtil.sha256('text'); // SHA256加密
CryptoUtil.randomString(16); // 生成随机字符串

// 日期工具
DateUtil.format(new Date()); // '2023-02-17 18:00:00'
DateUtil.timestamp(); // 获取当前时间戳（秒）
DateUtil.addDays(new Date(), 7); // 添加7天
```

### 4. 使用业务异常类

```typescript
import { BusinessException, ErrorCode } from '../common';

// 使用预定义的异常方法
throw BusinessException.notFound('用户不存在');
throw BusinessException.unauthorized('未授权访问');
throw BusinessException.forbidden('无权限操作');

// 自定义异常
throw new BusinessException(ErrorCode.USER_NOT_FOUND, '找不到该用户');
```

### 5. 统一响应格式

所有接口都会自动返回以下格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": 1676630400000
}
```

错误响应格式：

```json
{
  "code": 400,
  "message": "参数错误",
  "timestamp": 1676630400000
}
```

## 自定义扩展

### 添加新的错误码

在 `constants/error-code.constant.ts` 中添加：

```typescript
export const ErrorCode = {
  // ... 现有代码
  CUSTOM_ERROR: 5000,
} as const;

export const ErrorMessage: Record<number, string> = {
  // ... 现有代码
  [ErrorCode.CUSTOM_ERROR]: '自定义错误',
};
```

### 添加新的工具方法

创建新的工具类文件，并在 `index.ts` 中导出。

## 注意事项

1. 所有业务异常都应使用 `BusinessException` 抛出
2. 工具类都是静态方法，无需实例化直接调用
3. 响应拦截器会自动处理返回数据，无需在每个接口手动包装
4. 异常过滤器会自动捕获所有异常并返回统一格式
