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
}

export const useSendMessageStream = (userId?: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({ message, callbacks }: SendMessageStreamParams) => {
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
                  }
               )
               .catch(reject);
         });
      },
      onSuccess: (_, variables) => {
         // Invalider et refetch immédiatement les conversations pour rafraîchir la liste
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
         // Refetch immédiatement pour mettre à jour la sidebar
         queryClient.refetchQueries({
            queryKey: ['conversations', userId],
         });

         // Invalider aussi la conversation spécifique si elle existe
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
      mutationFn: async (message: ChatMessage) => {
         return chatApi.sendMessage(message);
      },
      onSuccess: () => {
         // Invalider et refetch immédiatement les conversations pour rafraîchir la liste
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
         // Refetch immédiatement pour mettre à jour la sidebar
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
         // TODO: Replace with actual API call when backend is ready
         console.log(`Toggle favorite for ${conversationId} to ${isFavorite}`);
         return Promise.resolve();
         // return chatApi.toggleFavorite(conversationId, isFavorite);
      },
      onSuccess: () => {
         // Invalider les conversations pour rafraîchir la liste
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
         // TODO: Replace with actual API call when backend is ready
         console.log(`Delete conversation ${conversationId}`);
         return Promise.resolve();
         // return chatApi.deleteConversation(conversationId);
      },
      onSuccess: () => {
         // Invalider les conversations pour rafraîchir la liste
         queryClient.invalidateQueries({
            queryKey: ['conversations', userId],
         });
      },
      onError: (error) => {
         console.error('Error deleting conversation:', error);
      },
   });
};
