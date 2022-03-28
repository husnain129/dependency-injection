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
  Session,
} from '@nestjs/common';
import { Serialize } from './../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@Serialize(UserDto) // Interceptor For all routes in this controller

// We can use interceptor here but this is not ideal
// Because we have to import this interceptor all file where we want to use this interceptor
// If we use Interceptor at global scale of all those controller then we don't have to import intercaptor to all files
// @UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body() { email, password }: createUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() { email, password }: createUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

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
