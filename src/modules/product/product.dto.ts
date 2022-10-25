import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  id: string;

  @ApiProperty({
    example: 'nome do produto',
    description: 'nome para cadastro do produto',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 12.0,
    description: 'preço do produto',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '12/12/2023',
    description: 'data de validade do produto',
  })
  @IsString()
  dueDate: string;
}
