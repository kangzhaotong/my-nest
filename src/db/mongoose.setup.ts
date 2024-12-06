// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
// import { IConfig } from 'src/config/config.interface';

// export const setupMongodb = () => {
//   // 从configService中获取环境变量，并连接mongo
//   return MongooseModule.forRootAsync({
//     // 引入 ConfigModule 模块
//     imports: [ConfigModule],
//     // 从 ConfigService 中读取配置，并且最终 return 给 useFactory 回调方法，此方法将使用我们的配置去链接 Mongodb
//     useFactory: (configService: ConfigService<IConfig>) => {
//       const mongooseOptions: MongooseModuleOptions = {
//         uri: configService.get('MONGO_URI'),
//         dbName: configService.get('MONGO_DB_NAME'),
//         user: configService.get('MONGO_USER'),
//         pass: configService.get('MONGO_PASS'),
//         authSource: configService.get('MONGO_AUTH_SOURCE'),
//       };
//       return mongooseOptions;
//     },
//     // 注入 ConfigService
//     inject: [ConfigService],
//   });
// };
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IConfig } from 'src/config/config.interface';
export const setupMongodb = () => {
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService<IConfig>) => {
      return {
        uri: configService.get('MONGO_URI'),
        dbName: configService.get('MONGO_DB_NAME'),
        user: configService.get('MONGO_USER'),
        pass: configService.get('MONGO_PASS'),
        authSource: configService.get('MONGO_AUTH_SOURCE'),
      };
    },
    inject: [ConfigService],
  });
};
