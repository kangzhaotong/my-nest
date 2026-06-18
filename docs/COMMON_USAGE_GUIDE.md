# 公共方法封装快速入门指南

## 📦 已封装的功能

### 1. 统一响应格式
- ✅ 自动包装所有接口响应
- ✅ 统一的成功/失败响应结构
- ✅ 分页数据格式化

### 2. 异常处理
- ✅ 全局异常过滤器
- ✅ 业务异常类
- ✅ 标准错误码定义

### 3. 工具类
- ✅ 响应工具 (ResponseUtil)
- ✅ 验证工具 (ValidatorUtil)
- ✅ 加密工具 (CryptoUtil)
- ✅ 日期工具 (DateUtil)

## 🚀 快速开始

### 步骤 1: 全局配置已完成

在 `src/main.ts` 中已配置：
- 全局响应拦截器（统一响应格式）
- 全局异常过滤器（统一异常处理）

### 步骤 2: 在 Controller 中使用

#### 基础用法 - 直接返回数据

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('list')
  async getUserList() {
    const users = await this.userService.findAll();
    return users; // 拦截器会自动包装成统一格式
  }
}
```

**响应结果：**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": [...],
  "timestamp": 1676630400000
}
```

#### 高级用法 - 使用 ResponseUtil

```typescript
import { Controller, Get } from '@nestjs/common';
import { ResponseUtil } from '../common';

@Controller('user')
export class UserController {
  @Get('info')
  async getUserInfo() {
    const user = await this.userService.findOne();
    return ResponseUtil.success(user, '获取用户信息成功');
  }

  @Get('page')
  async getUserPage() {
    const { list, total } = await this.userService.findPage();
    return ResponseUtil.page(list, total, 1, 10);
  }
}
```

#### 参数验证与异常处理

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { BusinessException, ValidatorUtil, ResponseUtil } from '../common';

@Controller('user')
export class UserController {
  @Post('create')
  async createUser(@Body() body: any) {
    // 验证必填参数
    if (!body.name) {
      throw BusinessException.paramsError('用户名不能为空');
    }

    // 验证邮箱格式
    if (!ValidatorUtil.isEmail(body.email)) {
      throw BusinessException.paramsError('邮箱格式不正确');
    }

    // 验证手机号
    if (body.phone && !ValidatorUtil.isPhone(body.phone)) {
      throw BusinessException.paramsError('手机号格式不正确');
    }

    const user = await this.userService.create(body);
    return ResponseUtil.success(user, '创建用户成功');
  }
}
```

## 📝 常用工具类

### ValidatorUtil - 验证工具

```typescript
import { ValidatorUtil } from '../common';

// 验证邮箱
ValidatorUtil.isEmail('test@example.com'); // true

// 验证手机号（中国大陆）
ValidatorUtil.isPhone('13800138000'); // true

// 验证身份证号
ValidatorUtil.isIdCard('110101199001011234'); // true

// 验证 URL
ValidatorUtil.isUrl('https://example.com'); // true

// 验证是否为空
ValidatorUtil.isEmpty(null); // true
ValidatorUtil.isEmpty(''); // true
ValidatorUtil.isEmpty([]); // true

// 验证密码强度（0-弱，1-中，2-强）
ValidatorUtil.getPasswordStrength('abc123'); // 1
ValidatorUtil.getPasswordStrength('Abc@123'); // 2
```

### CryptoUtil - 加密工具

```typescript
import { CryptoUtil } from '../common';

// MD5 加密
const md5Hash = CryptoUtil.md5('password');

// SHA256 加密
const sha256Hash = CryptoUtil.sha256('password');

// Base64 编码/解码
const encoded = CryptoUtil.base64Encode('hello');
const decoded = CryptoUtil.base64Decode(encoded);

// 生成随机字符串
const randomStr = CryptoUtil.randomString(16);

// AES 加密/解密
const key = 'your-32-byte-key-here-exactly!!';
const iv = 'your-16-byte-iv!';
const encrypted = CryptoUtil.aesEncrypt('secret', key, iv);
const decrypted = CryptoUtil.aesDecrypt(encrypted, key, iv);
```

### DateUtil - 日期工具

```typescript
import { DateUtil } from '../common';

// 格式化日期
DateUtil.format(new Date()); // '2023-02-17 18:00:00'
DateUtil.format(new Date(), 'YYYY-MM-DD'); // '2023-02-17'

// 获取时间戳
DateUtil.timestamp(); // 秒级时间戳
DateUtil.timestampMs(); // 毫秒级时间戳

// 日期计算
DateUtil.addDays(new Date(), 7); // 加7天
DateUtil.addHours(new Date(), 2); // 加2小时

// 计算日期差
const days = DateUtil.daysBetween(date1, date2);

// 日期范围
DateUtil.startOfDay(); // 今天 00:00:00
DateUtil.endOfDay(); // 今天 23:59:59

// 判断是否为同一天
DateUtil.isSameDay(date1, date2);
```

## ⚠️ 业务异常处理

### 预定义异常方法

```typescript
import { BusinessException } from '../common';

// 参数错误
throw BusinessException.paramsError('参数不正确');

// 未授权
throw BusinessException.unauthorized('请先登录');

// 禁止访问
throw BusinessException.forbidden('无权限访问');

// 资源不存在
throw BusinessException.notFound('用户不存在');
```

### 自定义异常

```typescript
import { BusinessException, ErrorCode } from '../common';

// 使用自定义错误码
throw new BusinessException(ErrorCode.USER_NOT_FOUND, '找不到该用户');
```

## 🎯 实际应用示例

### 用户注册接口

```typescript
@Post('register')
async register(@Body() body: { name: string; email: string; password: string }) {
  // 1. 参数验证
  if (!body.name || !body.email || !body.password) {
    throw BusinessException.paramsError('姓名、邮箱和密码不能为空');
  }

  // 2. 格式验证
  if (!ValidatorUtil.isEmail(body.email)) {
    throw BusinessException.paramsError('邮箱格式不正确');
  }

  // 3. 密码强度验证
  if (ValidatorUtil.getPasswordStrength(body.password) < 1) {
    throw BusinessException.paramsError('密码强度不够');
  }

  // 4. 检查邮箱是否已存在
  const existUser = await this.userService.findByEmail(body.email);
  if (existUser) {
    throw new BusinessException(ErrorCode.USER_ALREADY_EXISTS, '该邮箱已被注册');
  }

  // 5. 密码加密
  const hashedPassword = CryptoUtil.sha256(body.password);

  // 6. 保存用户
  const user = await this.userService.create({
    ...body,
    password: hashedPassword,
    createdAt: DateUtil.format(new Date()),
  });

  // 7. 返回成功响应
  return ResponseUtil.success(user, '注册成功');
}
```

### 用户列表分页接口

```typescript
@Get('page')
async getUserPage(
  @Query('page') page: string = '1',
  @Query('pageSize') pageSize: string = '10',
) {
  const pageNum = parseInt(page);
  const size = parseInt(pageSize);

  // 参数验证
  if (pageNum < 1 || size < 1) {
    throw BusinessException.paramsError('页码和每页数量必须大于0');
  }

  // 查询数据
  const { list, total } = await this.userService.findPage(pageNum, size);

  // 返回分页格式
  return ResponseUtil.page(list, total, pageNum, size);
}
```

**响应结果：**
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10
  },
  "timestamp": 1676630400000
}
```

## 📚 更多示例

查看 `src/examples/user-example.controller.ts` 文件，包含完整的使用示例。

## 🔧 扩展与自定义

### 添加自定义错误码

编辑 `src/common/constants/error-code.constant.ts`：

```typescript
export const ErrorCode = {
  // ...现有代码
  CUSTOM_ERROR: 5000,
} as const;

export const ErrorMessage: Record<number, string> = {
  // ...现有代码
  [ErrorCode.CUSTOM_ERROR]: '自定义错误消息',
};
```

### 创建自定义工具类

1. 在 `src/common/utils/` 创建新文件
2. 在 `src/common/index.ts` 中导出

```typescript
// src/common/utils/string.util.ts
export class StringUtil {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// src/common/index.ts
export * from './utils/string.util';
```

## 📖 参考文档

- [完整 API 文档](./src/common/README.md)
- [示例代码](./src/examples/user-example.controller.ts)
- [错误码列表](./src/common/constants/error-code.constant.ts)

## ✨ 最佳实践

1. **始终使用 BusinessException 抛出业务异常**
2. **在创建/更新接口中进行完整的参数验证**
3. **敏感信息（密码等）必须加密后存储**
4. **接口响应消息要清晰明确**
5. **合理使用错误码，便于前端统一处理**
