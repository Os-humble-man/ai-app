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
    * Get conversations that are NOT in any folder (recent conversations)
    */
   getConversationsWithoutFolder: async (userId: string) => {
      return apiClient.post<Conversation[]>(
         '/chat/conversations/without-folder',
         { userId }
      );
   },

   /**
    * Get conversations in a specific folder
    */
   getConversationsByFolder: async (userId: string, folderId: string) => {
      return apiClient.post<Conversation[]>(
         `/chat/conversations/folder/${folderId}`,
         { userId }
      );
   },

   /**
    * Get conversations grouped by folder status
    */
   getConversationsGrouped: async (userId: string) => {
      return apiClient.post<{
         withFolder: Conversation[];
         withoutFolder: Conversation[];
      }>('/chat/conversations/grouped', { userId });
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
    * Move a conversation to a different folder
    */
   moveConversationToFolder: async (
      conversationId: string,
      folderId: string | null
   ) => {
      return apiClient.post('/chat/conversation/move-folder', {
         conversationId,
         folderId,
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
