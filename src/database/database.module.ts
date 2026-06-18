/**
 * 数据库模块配置
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', 'Admin123'),
        database: configService.get('DB_DATABASE', 'nest_db'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC', true), // 生产环境应设为 false
        logging: true, // 开启 SQL 日志
        timezone: '+08:00', // 设置时区为东八区
        charset: 'utf8mb4', // 字符集
      }),
    }),
  ],
})
export class DatabaseModule {}
