import { inject, injectable } from 'inversify';
import { FolderService } from '../services/folder.service';
import type {
   CreateFolderDto,
   UpdateFolderDto,
} from '../types/dtos/folder.dto';
import { BaseController } from './base.controller';
import type { NextFunction, Request, Response } from 'express';

@injectable()
export class FolderController extends BaseController {
   constructor(@inject('FolderService') private folderService: FolderService) {
      super();
   }

   createFolder = async (req: Request, res: Response, next: NextFunction) => {
      const folder: CreateFolderDto = req.body;
      this.handleRequest(req, res, next, async () => {
         return this.folderService.createFolder(folder);
      });
   };

   getFoldersByUserId = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { userId } = req.params;
      this.handleRequest(req, res, next, async () => {
         return this.folderService.getFoldersByUserId(userId!);
      });
   };

   updateFolderById = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;
      const folder: UpdateFolderDto = req.body;
      this.handleRequest(req, res, next, async () => {
         return this.folderService.updateFolderById(id!, folder);
      });
   };

   deleteFolderById = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;
      this.handleRequest(req, res, next, async () => {
         return this.folderService.deleteFolderById(id!);
      });
   };
}
