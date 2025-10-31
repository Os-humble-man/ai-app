import { Router } from 'express';
import { container } from '../container';
import type { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { UserSchema } from '../schema/user.schema';
import passport from '../strategies/google.strategy';
import GithubPassport from '../strategies/github.strategy';

const authRoutes = Router();

const authController = container.get<AuthController>('AuthController');

authRoutes.post('/login', validate(UserSchema.loginUser), authController.login);
authRoutes.get(
   '/google',
   passport.authenticate('google', { scope: ['email', 'profile'] }),
   authController.googleCallback
);
authRoutes.get(
   '/google/callback',
   passport.authenticate('google', { session: false }),
   authController.googleCallback
);

authRoutes.get(
   '/github',
   GithubPassport.authenticate('github', { scope: ['user:email'] }),
   authController.githubCallback
);
authRoutes.get(
   '/github/callback',
   GithubPassport.authenticate('github', { session: false }),
   authController.githubCallback
);

export { authRoutes };
