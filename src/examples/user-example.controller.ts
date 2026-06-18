/**
 * 用户控制器示例
 * 展示如何使用公共方法封装
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ResponseUtil,
  BusinessException,
  ValidatorUtil,
  CryptoUtil,
  DateUtil,
} from '../common';

@Controller('example/user')
export class UserExampleController {
  /**
   * 示例1: 直接返回数据（会被拦截器自动包装）
   */
  @Get('list')
  async getUserList() {
    // 模拟数据库查询
    const users = [
      { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
      { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
    ];
    return users; // 拦截器会自动包装成统一格式
  }

  /**
   * 示例2: 使用 ResponseUtil 手动返回成功响应
   */
  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    const user = {
      id: parseInt(id),
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com',
      createdAt: DateUtil.format(new Date()),
    };
    return ResponseUtil.success(user, '获取用户信息成功');
  }

  /**
   * 示例3: 使用 ResponseUtil 返回分页数据
   */
  @Get('page/list')
  async getUserPage(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    // 模拟分页数据
    const list = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      age: 20 + i,
    }));
    const total = 100;

    return ResponseUtil.page(list, total, parseInt(page), parseInt(pageSize));
  }

  /**
   * 示例4: 参数验证并抛出业务异常
   */
  @Post('create')
  async createUser(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      phone?: string;
    },
  ) {
    // 验证必填参数
    if (!body.name || !body.email || !body.password) {
      throw BusinessException.paramsError('姓名、邮箱和密码不能为空');
    }

    // 验证邮箱格式
    if (!ValidatorUtil.isEmail(body.email)) {
      throw BusinessException.paramsError('邮箱格式不正确');
    }

    // 验证手机号格式（如果提供）
    if (body.phone && !ValidatorUtil.isPhone(body.phone)) {
      throw BusinessException.paramsError('手机号格式不正确');
    }

    // 验证密码强度
    const passwordStrength = ValidatorUtil.getPasswordStrength(body.password);
    if (passwordStrength < 1) {
      throw BusinessException.paramsError(
        '密码强度不够，需要包含字母、数字或特殊字符',
      );
    }

    // 加密密码
    const hashedPassword = CryptoUtil.sha256(body.password);

    // 模拟保存用户
    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
      phone: body.phone,
      createdAt: DateUtil.format(new Date()),
    };

    return ResponseUtil.success(newUser, '创建用户成功');
  }

  /**
   * 示例5: 更新用户信息
   */
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    // 检查用户是否存在
    const userExists = parseInt(id) > 0; // 模拟查询
    if (!userExists) {
      throw BusinessException.notFound('用户不存在');
    }

    // 模拟更新
    const updatedUser = {
      id: parseInt(id),
      ...body,
      updatedAt: DateUtil.format(new Date()),
    };

    return ResponseUtil.success(updatedUser, '更新用户成功');
  }

  /**
   * 示例6: 删除用户
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    // 检查用户是否存在
    const userExists = parseInt(id) > 0; // 模拟查询
    if (!userExists) {
      throw BusinessException.notFound('用户不存在');
    }

    // 检查权限（示例）
    const hasPermission = true; // 模拟权限检查
    if (!hasPermission) {
      throw BusinessException.forbidden('无权限删除该用户');
    }

    // 模拟删除
    return ResponseUtil.success(null, '删除用户成功');
  }

  /**
   * 示例7: 工具类使用展示
   */
  @Get('utils/demo')
  async utilsDemo() {
    return ResponseUtil.success({
      // 日期工具
      date: {
        current: DateUtil.format(new Date()),
        timestamp: DateUtil.timestamp(),
        addDays: DateUtil.format(DateUtil.addDays(new Date(), 7)),
        startOfDay: DateUtil.format(DateUtil.startOfDay()),
      },
      // 验证工具
      validation: {
        isEmail: ValidatorUtil.isEmail('test@example.com'),
        isPhone: ValidatorUtil.isPhone('13800138000'),
        isEmpty: ValidatorUtil.isEmpty(''),
      },
      // 加密工具
      crypto: {
        md5: CryptoUtil.md5('test'),
        randomString: CryptoUtil.randomString(16),
      },
    });
  }

  /**
   * 示例8: 模拟未授权访问
   */
  @Get('protected/resource')
  async protectedResource() {
    const isAuthenticated = false; // 模拟未登录

    if (!isAuthenticated) {
      throw BusinessException.unauthorized('请先登录');
    }

    return ResponseUtil.success({ data: 'Protected data' });
  }
}
