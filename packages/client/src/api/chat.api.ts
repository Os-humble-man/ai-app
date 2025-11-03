import type {
   Conversation,
   ConversationWithMessages,
} from '@/types/conversation';
import apiClient from './apiClient';

export interface ChatMessage {
   conversationId?: string;
   prompt: string;
   senderId?: string;
   timestamp?: number;
}

export interface StreamChunk {
   type: 'chunk' | 'done' | 'error';
   content?: string;
   error?: string;
}

export const chatApi = {
   /**
    * Send a message and receive streaming response
    * Uses apiClient.stream() for consistent architecture
    */
   sendMessageStream: async (
      message: ChatMessage,
      onChunk: (chunk: string) => void,
      onDone: () => void,
      onError: (error: string) => void,
      onConversationId?: (conversationId: string) => void
   ) => {
      await apiClient.stream<StreamChunk>('/chat/stream', message, {
         onChunk,
         onDone,
         onError,
         onConversationId,
      });
   },

   /**
    * Send a message without streaming (regular HTTP request)
    */
   sendMessage: async (message: ChatMessage) => {
      return apiClient.post('/chat', message);
   },

   /**
    * Get the list of conversations for a user
    */
   getConversations: async (userId: string) => {
      return apiClient.post<Conversation[]>('/chat/conversations', { userId });
   },

   /**
    * Delete a conversation by ID
    */
   deleteConversation: async (conversationId: string) => {
      return apiClient.delete(`/chat/conversation/${conversationId}`);
   },

   /**
    * Toggle favorite status of a conversation
    */
   toggleFavorite: async (conversationId: string, isFavorite: boolean) => {
      return apiClient.post('/chat/conversation/toggle-favorite', {
         conversationId,
         isFavorite,
      });
   },

   /**
    * Get a conversation by ID
    */
   getConversation: async (conversationId: string) => {
      return apiClient.get<ConversationWithMessages>(
         `/chat/conversation/${conversationId}`
      );
   },
};
