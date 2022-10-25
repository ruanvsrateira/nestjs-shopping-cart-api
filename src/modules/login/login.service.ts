import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { LoginDTO } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(login: LoginDTO, req: Request) {
    if (!login.email || !login.password)
      throw new BadRequestException('Invalid Arguments');

    const userBd = await this.userRepository.findOne({
      where: { email: login.email },
    });

    if (userBd.password == login.password) {
      req.session.userId = userBd.id;

      return { userLogged: true };
    }

    throw new BadRequestException('Bad credentials');
  }
}
