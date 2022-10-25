import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from '../cart/cart.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  dueDate: string;

  @ManyToOne((type) => CartEntity, (cart) => cart.products)
  cart?: CartEntity;
}
