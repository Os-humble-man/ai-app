import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import type { CreateUserDto } from '../types/dtos/UserDto';
import { BusinessError } from '../utils/errors/BusinessError';
import { HttpStatus } from '../utils/HttpStatus';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError';
import { JwtHelper } from '../utils/JwtHelper';
import type { OAuthProfile } from '../types/OAuthProfile';

@injectable()
export class AuthService {
   constructor(
      @inject('UserRepository') private userRepository: UserRepository
   ) {}
   createUser = async (user: CreateUserDto) => {
      const existingUser = await this.userRepository.findUserByEmail(
         user.email
      );
      if (existingUser)
         throw new BusinessError(
            'User with this email already exists',
            HttpStatus.CONFLICT
         );
      const verificationToken = JwtHelper.sign(
         { email: user.email },
         { expiresIn: '24h' }
      );
      const passwordHash = await this.hashPassword(user.password);
      const createdUser = await this.userRepository.create({
         email: user.email,
         passwordHash,
         name: user.name,
         verificationToken,
      });
      return this.sanitizeUser(createdUser);
   };

   verifyEmail = async (token: string) => {
      const payload = JwtHelper.verify(token) as { email: string };
      if (!payload.email) {
         throw new BusinessError('Invalid token', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userRepository.findUserByEmail(payload.email);
      if (!user) {
         throw new NotFoundError('User not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.verifyUserEmail(user.id);
      return {
         success: true,
         message: 'Email verified successfully',
      };
   };

   me = async (token: string) => {
      const payload = JwtHelper.verify(token) as { id: string; email: string };
      const user = await this.userRepository.findUserById(payload.id);
      if (!user) {
         throw new NotFoundError('User not found', HttpStatus.NOT_FOUND);
      }
      return this.sanitizeUser(user);
   };

   authenticateUser = async (email: string, password: string) => {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
         throw new NotFoundError('User not found', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password!);
      if (!isPasswordValid) {
         throw new UnauthorizedError(
            'Invalid email or password',
            HttpStatus.UNAUTHORIZED
         );
      }
      const safeUser = this.sanitizeUser(user);
      const token = JwtHelper.sign({ userId: user.id, email: user.email });

      return { user: safeUser, token };
   };

   authenticateUserWithProvider = async (
      provider: 'google' | 'github',
      profile: OAuthProfile
   ) => {
      let user = await this.userRepository.findUserByEmail(profile.email);
      if (!user) {
         user = await this.userRepository.create({
            email: profile.email,
            name: profile.name,
            passwordHash: '', // No password for OAuth users
            provider: provider,
            providerId: profile.id,
            avatarUrl: profile.avatarUrl!,
         });
      }
      const safeUser = this.sanitizeUser(user);
      const token = JwtHelper.sign({ userId: user.id, email: user.email });
      return { user: safeUser, token };
   };

   updateUserPassword = async (userId: string, newPassword: string) => {
      const newPasswordHash = await this.hashPassword(newPassword);
      const updatedUser = await this.userRepository.updateUserPassword(
         userId,
         newPasswordHash
      );
      return this.sanitizeUser(updatedUser);
   };

   deleteUser = async (userId: string) => {
      const deletedUser = await this.userRepository.deleteUser(userId);
      return this.sanitizeUser(deletedUser);
   };
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
