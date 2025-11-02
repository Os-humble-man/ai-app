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
