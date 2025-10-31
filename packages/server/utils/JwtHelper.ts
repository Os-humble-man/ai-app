import jwt from 'jsonwebtoken';

export class JwtHelper {
   private static readonly JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
   private static readonly JWT_EXPIRATION = '1h';

   static sign(payload: object): string {
      return jwt.sign(payload, this.JWT_SECRET, {
         expiresIn: this.JWT_EXPIRATION,
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
