import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from './../user.entity';
import { UserService } from './../user.service';

// Add currentUser property to Express Request
// unless you have to put @ts-ignore flag before req.currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.userService.findOne(userId);
      //
      req.currentUser = user;
    }

    next();
  }
}
