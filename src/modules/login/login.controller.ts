import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDTO } from './login.dto';
import { LoginService } from './login.service';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() login: LoginDTO, @Req() request: Request) {
    return await this.loginService.login(login, request);
  }

  @Get()
  async iAmLogged(@Req() request: Request) {
    if (request.session.userId) return true;

    return false;
  }

  @Delete()
  async logout(@Req() req: Request) {
    req.session.destroy((err) => null);

    return { logged: false };
  }
}
