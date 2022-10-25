import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async get() {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() user: UserDTO) {
    return await this.userService.createNewUser(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UserDTO) {
    return await this.userService.updateUserById(id, user);
  }
}
