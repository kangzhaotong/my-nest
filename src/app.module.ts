import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { AppController } from './controller/app.controller';
import { MyCatController } from './controller/myCat/index.controller';
import { AppService } from './app.service';
import { MyCatService } from './services/myCat.serve';
import { UserService } from './services/user.serve';
import { setupConfig } from './config/config.setup';
import { setupMongodb } from './db/mongoose.setup';
import { UserModule } from './user/user.module';
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
