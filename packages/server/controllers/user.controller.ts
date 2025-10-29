import { inject, injectable } from 'inversify';
import { BaseController } from './base.controller';
import type { UserService } from '../services/user.service';
import type { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController extends BaseController {
   constructor(@inject('UserService') private userService: UserService) {
      super();
   }
   createUser = async (req: Request, res: Response, next: NextFunction) => {
      this.handleRequest(req, res, next, async () => {
         return this.userService.createUser(req.body);
      });
   };
}
