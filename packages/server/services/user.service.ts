import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import type { UserRepository } from '../repositories/user.repository';
import type { CreateUserDto } from '../types/dtos/UserDto';

@injectable()
export class UserService {
   constructor(
      @inject('UserRepository') private userRepository: UserRepository
   ) {}
   async createUser(user: CreateUserDto) {
      const passwordHash = await this.hashPassword(user.password);
      const createdUser = await this.userRepository.create({
         email: user.email,
         passwordHash,
         name: user.name,
      });
      const { password, ...safeUser } = createdUser;
      return safeUser as Omit<typeof createdUser, 'password'>;
   }

   private async hashPassword(password: string): Promise<string> {
      const SALT_ROUNDS = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      return hashedPassword;
   }
}
