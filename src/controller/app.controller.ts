/*
 * @Author: M78.Kangzhaotong
 * @Date: 2023-02-17 16:51:19
 * @Last Modified by: M78.Kangzhaotong
 * @Last Modified time: 2023-02-17 18:07:53
 */
/**
 * 应用程序控制器，@Controller() 可以指定参数，用于定义类的父路由，如 @Controller("cat")，此时这个类的所有父路由就会成为 /cat
 * 应用程序控制器，@Controller() 用来声明父级路由也就是接口前缀，例如@Controller('getHellow'), /getHellow/*就是下面所有路由的前缀
 *
 * 被 @Controller() 修饰的类，可以通过其构造函数完成依赖注入，但依赖注入的类必须与当前类属于同一个模块
 */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.serve';
import { ResponseUtil } from '../common';

@Controller('/app')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/children/:id?')
  getHello(@Param('id') id: string): object {
    const userInfo = this.userService.getUserInfo(id);
    return ResponseUtil.success(userInfo, '获取用户信息成功');
  }
}
