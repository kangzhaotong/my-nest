import { Module } from '@nestjs/common';
import { setupConfig } from './config/config.setup';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    // UserModule,
    setupConfig(),
    // setupMongodb(),
    DatabaseModule, // MySQL 数据库模块
    ProductModule, // 商品模块
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
