import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../cart/cart.entity';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async createNewUser(user: UserDTO): Promise<UserEntity> {
    const userExist = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userExist)
      throw new BadRequestException('User already registred by this email');

    const userCreated = await this.userRepository.save(user);

    const cart = new CartEntity(userCreated.id);

    await this.cartRepository.save(cart);

    return userCreated;
  }

  async deleteUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not founded');

    await this.userRepository.delete(id);

    return user;
  }

  async updateUserById(id: number, user: UserDTO) {
    const userExist = await this.userRepository.findOne({ where: { id } });

    if (!userExist) throw new NotFoundException('User not founded');

    await this.userRepository.update({ id }, user);

    return await this.userRepository.findOne({ where: { id } });
  }
}
