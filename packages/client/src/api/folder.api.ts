import apiClient from './apiClient';

export interface Folder {
   id: string;
   userId: string;
   name: string;
   color?: string;
   parentId?: string;
   createdAt: string;
   updatedAt: string;
}

export interface CreateFolderDto {
   userId: string;
   name: string;
   color?: string;
   parentId?: string;
}
export const folderApi = {
   /* Create Folder */
   createFolder: async (folder: CreateFolderDto) => {
      return apiClient.post('/folder', folder);
   },
   /* Get Folders by User ID */
   getFoldersByUserId: async (userId: string) => {
      return apiClient.get<Folder[]>(`/folder/user/${userId}`);
   },
   /* Update Folder by ID */
   updateFolderById: async (id: string, folder: Partial<CreateFolderDto>) => {
      return apiClient.put(`/folder/${id}`, folder);
   },
   /* Delete Folder by ID */
   deleteFolderById: async (id: string) => {
      return apiClient.delete(`/folder/${id}`);
   },
};
