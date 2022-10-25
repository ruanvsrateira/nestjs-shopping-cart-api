import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class CartDTO {
  @ApiProperty({
    example: 2,
    description: 'id do usuario logado pegado por meio da sessão',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'e287a9d6-650f-4524-8a87-b544c4ff4d94',
    description: 'identificador do produto no formato uuid',
  })
  @IsUUID()
  productId: string;
}
