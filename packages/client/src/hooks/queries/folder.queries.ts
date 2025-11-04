import { folderApi } from '@/api/folder.api';
import { useQuery } from '@tanstack/react-query';

export const useFolders = (userId: string) => {
   return useQuery({
      queryKey: ['folders', userId],
      queryFn: () => folderApi.getFoldersByUserId(userId!),
   });
};
