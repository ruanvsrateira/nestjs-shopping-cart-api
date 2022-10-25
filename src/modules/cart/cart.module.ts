import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { CartController } from './cart.controller';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
