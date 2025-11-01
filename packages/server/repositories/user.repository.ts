import { injectable } from 'inversify';
import { BaseRepository } from './base.repository';

@injectable()
export class UserRepository extends BaseRepository {
   /** Find user by ID
    * @param userId - The ID of the user to find
    * @returns The user object if found, otherwise null
    */
   async create(user: {
      email: string;
      passwordHash?: string;
      name: string;
      provider?: string;
      providerId?: string;
      avatarUrl?: string;
      verificationToken?: string;
   }) {
      const provider = (user.provider ?? 'local').toLowerCase();

      return this.prisma.user.create({
         data: {
            email: user.email,
            password: user.passwordHash,
            name: user.name,
            provider,
            providerId: user.providerId,
            avatarUrl: user.avatarUrl,
            emailVerified:
               provider === 'github' || provider === 'google'
                  ? new Date()
                  : null,
            verificationToken: user.verificationToken,
         },
      });
   }
   async findUserById(userId: string) {
      return this.prisma.user.findUnique({
         where: { id: userId },
      });
   }

   async verifyUserEmail(userId: string) {
      return this.prisma.user.update({
         where: { id: userId },
         data: { emailVerified: new Date(), verificationToken: null },
      });
   }

   async findUserByEmail(email: string) {
      return this.prisma.user.findUnique({
         where: { email },
      });
   }

   async updateUserPassword(userId: string, newPasswordHash: string) {
      return this.prisma.user.update({
         where: { id: userId },
         data: { password: newPasswordHash },
      });
   }

   async deleteUser(userId: string) {
      return this.prisma.user.delete({
         where: { id: userId },
      });
   }
}
