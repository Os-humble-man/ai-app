import { chatApi } from '@/api/chat.api';
import { useQuery } from '@tanstack/react-query';

export const useConversations = (userId?: string) => {
   return useQuery({
      queryKey: ['conversations', userId],
      queryFn: ({ queryKey }) => {
         const [, id] = queryKey as [string, string | undefined];
         return chatApi.getConversations(id!);
      },
      enabled: !!userId,
      refetchOnWindowFocus: false,
   });
};

export const useConversationsWithoutFolder = (userId?: string) => {
   return useQuery({
      queryKey: ['conversations', userId, 'without-folder'],
      queryFn: ({ queryKey }) => {
         const [, id] = queryKey as [string, string | undefined, string];
         return chatApi.getConversationsWithoutFolder(id!);
      },
      enabled: !!userId,
      refetchOnWindowFocus: false,
   });
};

export const useConversationsByFolder = (
   userId?: string,
   folderId?: string
) => {
   return useQuery({
      queryKey: ['conversations', userId, 'folder', folderId],
      queryFn: ({ queryKey }) => {
         const [, uid, , fid] = queryKey as [
            string,
            string | undefined,
            string,
            string | undefined,
         ];
         return chatApi.getConversationsByFolder(uid!, fid!);
      },
      enabled: !!userId && !!folderId,
      refetchOnWindowFocus: false,
   });
};

export const useConversationsGrouped = (userId?: string) => {
   return useQuery({
      queryKey: ['conversations', userId, 'grouped'],
      queryFn: ({ queryKey }) => {
         const [, id] = queryKey as [string, string | undefined, string];
         return chatApi.getConversationsGrouped(id!);
      },
      enabled: !!userId,
      refetchOnWindowFocus: false,
   });
};

export const useConversation = (conversationId: string) => {
   return useQuery({
      queryKey: ['conversation', conversationId],
      queryFn: ({ queryKey }) => {
         const [, id] = queryKey as [string, string];
         return chatApi.getConversation(id);
      },
      enabled: !!conversationId,
      refetchOnWindowFocus: false,
   });
};
