import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'email-usuario@gmail.com',
    description: 'E-mail para login do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senhaDoUsuario123',
    description: 'senha para login do usuário',
  })
  @IsString()
  password: string;
}
