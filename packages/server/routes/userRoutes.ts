import { Router } from 'express';
import { container } from '../container';
import type { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { UserSchema } from '../schema/user.schema';

const userRoutes = Router();

const userController = container.get<UserController>('UserController');

userRoutes.post(
   '/',
   validate(UserSchema.registerUser),
   userController.createUser
);

export { userRoutes };
