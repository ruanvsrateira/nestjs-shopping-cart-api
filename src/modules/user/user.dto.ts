import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  id?: number;

  @ApiProperty({
    example: 'nome usuario',
    description: 'nome para cadastro do usuário',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'emailUsuario@gmail.com',
    description: 'email para cadastro do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senhaUsuario123',
    description: 'senha para cadastro do usuário',
  })
  @IsString()
  password: string;
}
