import { chatApi, type ChatMessage } from '@/api/chat.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SendMessageCallbacks {
   onChunk?: (chunk: string) => void;
   onConversationId?: (conversationId: string) => void;
}

interface SendMessageStreamParams {
   message: ChatMessage;
   callbacks: SendMessageCallbacks;
   conversationId?: string;
   useRag?: boolean;
}

export const useSendMessageStream = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         message,
         callbacks,
         useRag = false,
      }: SendMessageStreamParams) => {
         return new Promise<void>((resolve, reject) => {
            chatApi
               .sendMessageStream(
                  message,
                  // onChunk
                  (chunk: string) => {
                     callbacks.onChunk?.(chunk);
                  },
                  // onDone
                  () => {
                     resolve();
                  },
                  // onError
                  (error: string) => {
                     reject(new Error(error));
                  },
                  // onConversationId
                  (conversationId: string) => {
                     callbacks.onConversationId?.(conversationId);
                  },
                  // useRag
                  useRag
               )
               .catch(reject);
         });
      },
      onSuccess: (_, variables) => {
         // Immediately invalidate and refetch conversations to refresh the list
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
         // Immediately refetch to update the sidebar
         queryClient.refetchQueries({
            queryKey: ['conversations', userId],
         });

         // Also invalidate the specific conversation if it exists
         if (variables.message.conversationId) {
            queryClient.invalidateQueries({
               queryKey: ['conversation', variables.message.conversationId],
            });
         }
      },
      onError: (error) => {
         console.error('Error sending message:', error);
      },
   });
};

export const useSendMessage = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         message,
         useRag = false,
      }: {
         message: ChatMessage;
         useRag?: boolean;
      }) => {
         return chatApi.sendMessage(message, useRag);
      },
      onSuccess: () => {
         // Immediately invalidate and refetch conversations to refresh the list
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
         // Immediately refetch to update the sidebar
         queryClient.refetchQueries({
            queryKey: ['conversations', userId],
         });
      },
      onError: (error) => {
         console.error('Error sending message:', error);
      },
   });
};

export const useToggleFavorite = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         conversationId,
         isFavorite,
      }: {
         conversationId: string;
         isFavorite: boolean;
      }) => {
         return chatApi.toggleFavorite(conversationId, isFavorite);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
      },
      onError: (error) => {
         console.error('Error toggling favorite:', error);
      },
   });
};

export const useDeleteConversation = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (conversationId: string) => {
         return chatApi.deleteConversation(conversationId);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
      },
      onError: (error) => {
         console.error('Error deleting conversation:', error);
      },
   });
};

export const useMoveConversationToFolder = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         conversationId,
         folderId,
      }: {
         conversationId: string;
         folderId: string | null;
      }) => {
         return chatApi.moveConversationToFolder(conversationId, folderId);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
      },
      onError: (error) => {
         console.error('Error moving conversation:', error);
      },
   });
};
