import { inject, injectable } from 'inversify';
import type { AuthService } from '../services/auth.service';
import { BaseController } from './base.controller';
import type { Request, Response, NextFunction } from 'express';
import { CookiesHelper } from '../utils/CookiesHelper';
import type { OAuthProfile } from '../types/OAuthProfile';

@injectable()
export class AuthController extends BaseController {
   constructor(@inject('AuthService') private authService: AuthService) {
      super();
   }

   login = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const { email, password } = req.body;
         const result = await this.authService.authenticateUser(
            email,
            password
         );
         CookiesHelper.setCookie(res, 'auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
         });
         return result;
      });
   };

   googleCallback = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const profile = req.user as OAuthProfile;
         const result = await this.authService.authenticateUserWithProvider(
            'google',
            profile
         );
         CookiesHelper.setCookie(res, 'auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
         });
         return result;
      });
   };

   githubCallback = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const profile = req.user as OAuthProfile;
         const result = await this.authService.authenticateUserWithProvider(
            'github',
            profile
         );
         CookiesHelper.setCookie(res, 'auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
         });
         return result;
      });
   };
}
