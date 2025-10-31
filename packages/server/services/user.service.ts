import { inject, injectable } from 'inversify';
import type { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserService {
   constructor(
      @inject('UserRepository') private userRepository: UserRepository
   ) {}

   async getUserById(userId: string) {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
         return null;
      }
      return this.sanitizeUser(user);
   }

   async getUserByEmail(email: string) {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
         return null;
      }
      return this.sanitizeUser(user);
   }

   private sanitizeUser(user: any) {
      const { password, ...safeUser } = user;
      return safeUser as Omit<typeof user, 'password'>;
   }
}
