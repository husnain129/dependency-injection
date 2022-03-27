import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  @Post('/signup')
  createUser(@Body() { email, password }: createUserDto) {
    console.log(email, password);
  }
}
