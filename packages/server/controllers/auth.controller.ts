import { inject, injectable } from 'inversify';
import type { AuthService } from '../services/auth.service';
import { BaseController } from './base.controller';
import type { Request, Response, NextFunction } from 'express';
import { CookiesHelper } from '../utils/CookiesHelper';
import type { OAuthProfile } from '../types/OAuthProfile';
import { MailService } from '../services/mail.service';

@injectable()
export class AuthController extends BaseController {
   constructor(
      @inject('AuthService') private authService: AuthService,
      @inject('MailService') private mailService: MailService
   ) {
      super();
   }

   register = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const { email, password, name } = req.body;
         const result = await this.authService.createUser({
            email,
            password,
            name,
         });
         await this.mailService.sendVerificationEmail(
            email,
            result.verificationToken
         );
         return result;
      });
   };

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

   verifyEmail = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const token = req.query.token as string;
         const result = await this.authService.verifyEmail(token);
         return result;
      });
   };

   me = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const token = req.cookies['auth_token'];
         const result = await this.authService.me(token);
         return result;
      });
   };

   updatePassword = (req: Request, res: Response, next: NextFunction) => {
      return this.handleRequest(req, res, next, async () => {
         const { id, newPassword } = req.body;
         const result = await this.authService.updateUserPassword(
            id,
            newPassword
         );
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
