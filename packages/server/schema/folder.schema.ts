import z from 'zod';

export const FolderSchema = {
   createFolder: {
      body: z.object({
         userId: z.string('Invalid user ID'),
         name: z
            .string('Invalid folder name')
            .trim()
            .min(1, 'Folder name cannot be empty')
            .max(100, 'Folder name is too long'),
         color: z.string('Invalid color').optional(),
         parentId: z.string('Invalid parent ID').optional(),
      }),
   },
   updateFolder: {
      body: z.object({
         id: z.string('Invalid folder ID'),
         userId: z.string('Invalid user ID'),
         name: z
            .string('Invalid folder name')
            .trim()
            .min(1, 'Folder name cannot be empty')
            .max(100, 'Folder name is too long'),
         color: z.string('Invalid color').optional(),
         parentId: z.string('Invalid parent ID').optional(),
      }),
   },
   updateFolderParam: {
      params: z.object({
         id: z.string('Invalid folder ID'),
      }),
   },
   idParam: {
      params: z.object({
         userId: z.string('Invalid user ID'),
      }),
   },
};
