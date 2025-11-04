import { Router } from 'express';
import { container } from '../container';
import { FolderController } from '../controllers/folder.controller';
import { validate } from '../middleware/validate';
import { FolderSchema } from '../schema/folder.schema';

const folderRoutes = Router();
const folderController = container.get<FolderController>('FolderController');

// POST /folders - Create a new folder
folderRoutes.post(
   '/',
   validate(FolderSchema.createFolder),
   folderController.createFolder
);

// GET /folders/user/:userId - Get folders by user ID
folderRoutes.get(
   '/user/:userId',
   validate(FolderSchema.idParam),
   folderController.getFoldersByUserId
);

// PUT /folders/:id - Update folder by ID
folderRoutes.put(
   '/:id',
   validate(FolderSchema.idParam),
   folderController.updateFolderById
);

// DELETE /folders/:id - Delete folder by ID
folderRoutes.delete(
   '/:id',
   validate(FolderSchema.idParam),
   folderController.deleteFolderById
);

export { folderRoutes };
