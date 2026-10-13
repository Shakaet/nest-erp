import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './create.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    let data = await this.usersService.createUser(createUserDto);

    return {
      status: 'success',
      message: 'User created successfully',
      data: data,
    };
  }


  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    let data = await this.usersService.getAllUsers();
    return {
      status: 'success',
      message: 'Users fetched successfully',
        data: data,
    };
  }
}
