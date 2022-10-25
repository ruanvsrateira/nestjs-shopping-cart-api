import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './modules/cart/cart.module';
import { LoginModule } from './modules/login/login.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_TYPE,
  DATABASE_USERNAME,
} from './settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE,
      host: DATABASE_HOST,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
    LoginModule,
    CartModule,
  ],
})
export class AppModule {}
