import { injectable } from 'inversify';
import { BaseRepository } from './base.repository';

@injectable()
export class UserRepository extends BaseRepository {
   /** Find user by ID
    * @param userId - The ID of the user to find
    * @returns The user object if found, otherwise null
    */
   async create(user: { email: string; passwordHash?: string; name: string }) {
      return this.prisma.user.create({
         data: {
            email: user.email,
            passwordHash: user.passwordHash,
            name: user.name,
         },
      });
   }
   async findUserById(userId: number) {
      return this.prisma.user.findUnique({
         where: { id: userId },
      });
   }
}
