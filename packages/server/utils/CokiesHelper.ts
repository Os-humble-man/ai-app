import type { Request, Response } from 'express';

/**
 * Helper class for managing cookies in an Express server environment.
 * Includes methods to set, get, and delete cookies.
 * Example usage:
 * // Setting a cookie
 * CookiesHelperServer.setCookie(res, 'token', 'abc123', { maxAge: 3600000 });
 *
 * // Getting a cookie
 * const token = CookiesHelperServer.getCookie(req, 'token');
 *
 * // Deleting a cookie
 * CookiesHelperServer.deleteCookie(res, 'token');
 * @author Oscar Kanangila
 */

export class CookiesHelperServer {
   static setCookie(
      res: Response,
      name: string,
      value: string,
      options: any = {}
   ) {
      const cookieOptions = {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         ...options,
      };
      res.cookie(name, value, cookieOptions);
   }

   static getCookie(req: Request, name: string): string | undefined {
      return req.cookies?.[name];
   }

   static deleteCookie(res: Response, name: string) {
      res.clearCookie(name);
   }
}
