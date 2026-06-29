import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const ignoredBrowserRequestPaths = [
    '/favicon.ico',
    '/.well-known/appspecific/com.chrome.devtools.json',
  ];

  ignoredBrowserRequestPaths.forEach((path) => {
    app.use(path, (_request, response) => response.status(204).send());
  });

  // 注册全局响应拦截器（统一响应格式）
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局异常过滤器（统一异常处理）
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = 3008;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`应用程序已启动，监听端口: ${port}`);
}
bootstrap();
