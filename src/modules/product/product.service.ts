import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return await this.repository.find({});
  }

  async createNewProduct(product: ProductDTO): Promise<ProductEntity> {
    return await this.repository.save(product);
  }

  async deleteProductById(id: string): Promise<ProductEntity> {
    const productDeleted = await this.repository.findOne({ where: { id } });

    if (!productDeleted) throw new NotFoundException('Product not founded');

    await this.repository.delete(id);

    return productDeleted;
  }

  async updateProductById(
    id: string,
    product: ProductDTO,
  ): Promise<ProductEntity> {
    const exist = await this.repository.findOne({ where: { id } });

    if (!exist) throw new NotFoundException('Product not founded');

    await this.repository.update({ id }, product);

    return this.repository.findOne({ where: { id } });
  }
}
