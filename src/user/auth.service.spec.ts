import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UserService>;

  beforeEach(async () => {
    //   Create a fake copy of the users service
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create a instance of auth Service', async () => {
    expect(service).toBeDefined();
  });

  it('Create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test12@gmail.com', 'test12');
    expect(user.password).not.toEqual('test12');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Throw an error if email is already is used', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a@gmail.com', password: 'a' } as User]);
    service.signup('a@gmail.com', 'a').catch((err) => done());
  });

  it('Throw an error if user is called with an unused email', (done) => {
    service.signin('alsdjlaj@gmail.com', '12312').catch((err) => done());
  });

  it('throws if an invalid password is provided', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ email: 'a@gmail.com', password: 'a' } as User]);
    service.signin('a@gmail.com', 'aalskjd').catch((err) => done());
  });
});
