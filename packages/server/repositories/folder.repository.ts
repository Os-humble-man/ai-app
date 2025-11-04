import { injectable } from 'inversify';
import { BaseRepository } from './base.repository';
import type {
   CreateFolderDto,
   UpdateFolderDto,
} from '../types/dtos/folder.dto';

@injectable()
export class FolderRepository extends BaseRepository {
   /** Create a new folder */
   create = async (folder: CreateFolderDto) => {
      return this.prisma.folder.create({
         data: {
            userId: folder.userId,
            name: folder.name,
            color: folder.color,
            parentId: folder.parentId,
         },
      });
   };

   /** Get folders by user ID */
   getByUserId = async (userId: string) => {
      return this.prisma.folder.findMany({
         where: {
            userId,
         },
      });
   };

   /** Update folder by ID */
   updateById = async (id: string, folder: UpdateFolderDto) => {
      return this.prisma.folder.update({
         where: {
            id,
         },
         data: {
            name: folder.name,
            color: folder.color,
            parentId: folder.parentId,
         },
      });
   };
   /** Delete folder by ID */
   deleteById = async (id: string) => {
      return this.prisma.folder.delete({
         where: {
            id,
         },
      });
   };
}
