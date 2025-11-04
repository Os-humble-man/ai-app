import { inject, injectable } from 'inversify';
import type {
   CreateFolderDto,
   UpdateFolderDto,
} from '../types/dtos/folder.dto';
import type { FolderRepository } from '../repositories/folder.repository';

@injectable()
export class FolderService {
   constructor(
      @inject('FolderRepository') private folderRepository: FolderRepository
   ) {}

   createFolder = async (folder: CreateFolderDto) => {
      return await this.folderRepository.create(folder);
   };

   getFoldersByUserId = async (userId: string) => {
      return await this.folderRepository.getByUserId(userId);
   };

   updateFolderById = async (id: string, folder: UpdateFolderDto) => {
      return await this.folderRepository.updateById(id, folder);
   };

   deleteFolderById = async (id: string) => {
      return await this.folderRepository.deleteById(id);
   };
}
