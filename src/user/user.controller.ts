/* user.controller.ts */
// 引入 Nest.js 内置的各个功能
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// 引入用户服务
import { UserService } from './user.service';
// 引入创建用户 DTO 用于限制从接口处传来的参数
import { CreateUserDto } from './user.dto';
// 引入公共方法
import { ResponseUtil, BusinessException, ValidatorUtil } from '../common';

// 配置局部路由
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建user路由 user/createUser
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    // 验证必填参数
    if (!body.name) {
      throw BusinessException.paramsError('用户名不能为空');
    }

    const user = await this.userService.create(body);
    return ResponseUtil.success(user, '创建用户成功');
  }

  //查找所有 user 路由
  @Get('findAll')
  async findAll() {
    const users = await this.userService.findAll();
    return ResponseUtil.success(users, '获取用户列表成功');
  }

  // 查找某一个用户路由
  @Get('findOne')
  async findOne(@Query() query: any) {
    if (!query.name) {
      throw BusinessException.paramsError('用户名参数不能为空');
    }

    const users = await this.userService.findOne(query.name);
    if (!users || users.length === 0) {
      throw BusinessException.notFound('未找到该用户');
    }

    return ResponseUtil.success(users, '查询用户成功');
  }

  // 删除一个用户的路由
  @Delete(':sid')
  async deleteUser(@Param() param: any) {
    if (!param.sid) {
      throw BusinessException.paramsError('用户ID不能为空');
    }

    const result = await this.userService.delete(param.sid);
    if (result.deletedCount === 0) {
      throw BusinessException.notFound('用户不存在或已被删除');
    }

    return ResponseUtil.success(null, '删除用户成功');
  }

  // 更改用户信息的路由
  @Put(':sid')
  async updateUser(@Body() body: any, @Param() param: any) {
    if (!param.sid) {
      throw BusinessException.paramsError('用户ID不能为空');
    }

    if (!body || Object.keys(body).length === 0) {
      throw BusinessException.paramsError('更新数据不能为空');
    }

    const result = await this.userService.updateUser(param.sid, body);
    if (result.modifiedCount === 0) {
      throw BusinessException.notFound('用户不存在或数据未变更');
    }

    return ResponseUtil.success(null, '更新用户成功');
  }
}
