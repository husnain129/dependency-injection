import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from './../interceptors/serialize.interceptor';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(UserDto) // Interceptor For all routes in this controller
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  createUser(@Body() { email, password }: createUserDto) {
    return this.userService.create(email, password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) Interceptor For only current Route
  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
