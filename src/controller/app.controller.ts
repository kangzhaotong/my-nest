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
import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/children')
  getHello(): string {
    return this.appService.getHello();
  }
}
