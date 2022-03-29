import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //Create repository for use
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    // {
    //   // Here we define CurrentUserInterceptor to global level
    //   // When any request comes to any route of userController it passes through this interceptor
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },

    // Here instead of interceptor
    // We use currentUser middleware
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
