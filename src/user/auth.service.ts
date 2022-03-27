import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { UserService } from './user.service';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(email: string, password: string) {
    // 1 -  See if email is in use

    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // 2 -  Hash the users password
    //   -- Generate a salt
    const salt = randomBytes(8).toString('hex'); // 8 Bytes, 16 character long string

    //    -- Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //    -- Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    console.log('password: ', result);
    // 3 -  Create a new user an save it
    const user = await this.userService.create(email, result);
    // 4 -  return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log(storedHash, hash.toString('hex'));
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }
}
