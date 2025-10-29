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
      return this.sanitizeUser(createdUser);
   }

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

   async updateUserPassword(userId: string, newPassword: string) {
      const newPasswordHash = await this.hashPassword(newPassword);
      const updatedUser = await this.userRepository.updateUserPassword(
         userId,
         newPasswordHash
      );
      return this.sanitizeUser(updatedUser);
   }

   async deleteUser(userId: string) {
      const deletedUser = await this.userRepository.deleteUser(userId);
      return this.sanitizeUser(deletedUser);
   }

   private async hashPassword(password: string): Promise<string> {
      const SALT_ROUNDS = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      return hashedPassword;
   }

   private sanitizeUser(user: any) {
      const { password, ...safeUser } = user;
      return safeUser as Omit<typeof user, 'password'>;
   }
}
