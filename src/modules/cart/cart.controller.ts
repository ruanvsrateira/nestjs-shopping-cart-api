import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getProductsOfCart(@Req() req: Request) {
    return await this.cartService.getProductsOfCart(req.session.userId);
  }

  @Get(':productId')
  async addProductInCart(
    @Req() req: Request,
    @Param('productId') productId: string,
  ) {
    return await this.cartService.addProductInCart({
      userId: req.session.userId,
      productId,
    });
  }
}
