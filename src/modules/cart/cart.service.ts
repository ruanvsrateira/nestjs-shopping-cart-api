import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { CartDTO } from './cart.dto';
import { CartEntity } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProductsOfCart(userId: number): Promise<CartEntity> {
    if (!userId) throw new UnauthorizedException('Do login first');

    const cartExist = await this.cartRepository.findOne({ where: { userId } });

    if (!cartExist) throw new NotFoundException('Cart not founded');

    return await this.cartRepository.findOne({
      where: { userId },
      relations: { products: true },
    });
  }

  async addProductInCart(data: CartDTO): Promise<CartEntity> {
    if (!data.productId || !data.userId)
      throw new BadRequestException('Invalid arguments');

    const cartExist = await this.cartRepository.findOne({
      where: { userId: data.userId },
    });
    const productExist = await this.productRepository.findOne({
      where: { id: data.productId },
    });

    if (!cartExist) throw new NotFoundException('cart not founded');
    if (!productExist) throw new NotFoundException('product not founded');

    await this.productRepository.update(
      { id: data.productId },
      {
        cart: cartExist,
      },
    );

    return await this.cartRepository.findOne({
      where: { userId: data.userId },
      relations: {
        products: true,
      },
    });
  }
}
