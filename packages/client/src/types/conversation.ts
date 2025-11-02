export interface Message {
   id: string;
   conversationId: string;
   role: string;
   content: string;
   modelUsed: string | null;
   tokenCount: number | null;
   createdAt: Date;
}

export interface Conversation {
   id: string;
   userId: string;
   title: string;
   model: string;
   createdAt: Date;
   updatedAt: Date;
   isFavorite: boolean;
   folderId: string | null;
   tags: string[] | null;
   isPublic: boolean;
   shareId: string | null;
}

export interface ConversationWithMessages extends Conversation {
   messages: Message[];
}
