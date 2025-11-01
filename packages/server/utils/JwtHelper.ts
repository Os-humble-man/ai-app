import jwt from 'jsonwebtoken';

/**
 * JwtHelper class for signing and verifying JWT tokens.
 * Uses jsonwebtoken library.
 * The secret key and expiration time are configurable via environment variables.
 * Example usage:
 * // Signing a token
 * const token = JwtHelper.sign({ userId: '12345' });
 *
 * // Verifying a token
 * const payload = JwtHelper.verify(token);
 * @author Oscar Kanangila
 */

export class JwtHelper {
   private static readonly JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
   private static readonly JWT_EXPIRATION = '1h';

   static sign(payload: object, options?: jwt.SignOptions): string {
      return jwt.sign(payload, this.JWT_SECRET, {
         expiresIn: this.JWT_EXPIRATION,
         ...options,
      });
   }

   static verify(token: string): object | null {
      try {
         return jwt.verify(token, this.JWT_SECRET) as object;
      } catch (error) {
         return null;
      }
   }
}
