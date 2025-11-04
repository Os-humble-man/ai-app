import { folderApi } from '@/api/folder.api';
import type { CreateFolderDto } from '@/api/folder.api';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const useCreateFolder = () => {
   return useMutation({
      mutationFn: (newFolder: CreateFolderDto) =>
         folderApi.createFolder(newFolder),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['folders'] });
      },
      onError: (error) => {
         console.error('Error creating folder:', error);
      },
   });
};
export const useUpdateFolder = () => {
   return useMutation({
      mutationFn: ({
         id,
         updatedFolder,
      }: {
         id: string;
         updatedFolder: Partial<CreateFolderDto>;
      }) => folderApi.updateFolderById(id, updatedFolder),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['folders'] });
      },
      onError: (error) => {
         console.error('Error updating folder:', error);
      },
   });
};

export const useDeleteFolder = () => {
   return useMutation({
      mutationFn: (id: string) => folderApi.deleteFolderById(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['folders'] });
      },
      onError: (error) => {
         console.error('Error deleting folder:', error);
      },
   });
};
