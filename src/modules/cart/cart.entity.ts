import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity()
export class CartEntity {
  @PrimaryColumn({ unique: true })
  userId: number;

  @OneToMany((type) => ProductEntity, (product) => product.cart)
  products: ProductEntity[];

  constructor(userId?: number) {
    this.userId = userId;
  }
}
