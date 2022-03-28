import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Problem here - CurrnetUser decorator cannot access
// UserService because UserService is in dependency injection container
// Solution -  we have to create interceptor

export const CurrentUser = createParamDecorator(
  // context - wrapper around incoming request
  // work with http, sockets and graphql

  // Here data is comming from decorator param i.e @CurrentUser('admin')
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
