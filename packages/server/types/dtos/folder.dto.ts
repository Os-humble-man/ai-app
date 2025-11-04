export type CreateFolderDto = {
   userId: string;
   name: string;
   color?: string;
   parentId?: string;
};

export type UpdateFolderDto = {
   name?: string;
   color?: string;
   parentId?: string;
};

export type FolderDto = {
   id: string;
   userId: string;
   name: string;
   color?: string;
   parentId?: string;
   createdAt: Date;
};
