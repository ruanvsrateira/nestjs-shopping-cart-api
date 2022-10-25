import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async index(): Promise<ProductEntity[]> {
    return await this.productService.getAll();
  }

  @Post()
  async store(@Body() product: ProductDTO) {
    return await this.productService.createNewProduct(product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: ProductDTO) {
    return await this.productService.updateProductById(id, product);
  }
}
