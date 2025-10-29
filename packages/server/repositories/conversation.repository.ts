import type { Role } from '../generated/prisma/enums';
import { BaseRepository } from './base.repository';

interface Message {
   role: 'user' | 'assistant';
   content: string;
}

const conversations = new Map<string, Message[]>();

export class ConversationRepository extends BaseRepository {
   async create(userId: string, title: string, model: string) {
      return this.prisma.conversation.create({
         data: {
            userId,
            title,
            model,
         },
      });
   }
   async addMessage(conversationId: string, role: Role, content: string) {
      return this.prisma.message.create({
         data: { conversationId, role, content },
      });
   }

   async findById(conversationId: string) {
      return this.prisma.conversation.findUnique({
         where: { id: conversationId },
      });
   }

   async findByUserId(userId: string) {
      return this.prisma.conversation.findMany({
         where: { userId },
      });
   }

   async deleteById(conversationId: string) {
      return this.prisma.conversation.delete({
         where: { id: conversationId },
      });
   }

   async getLastResponseId(conversationId: string): Promise<string | null> {
      return this.prisma.conversation
         .findUnique({
            where: { id: conversationId },
            include: { messages: true },
         })
         .then((conversation) => {
            const messages = conversation?.messages;
            if (!messages || messages.length === 0) return null;
            const last = messages[messages.length - 1];
            return last?.id ?? null;
         });
   }

   async setLastResponseId(conversationId: string, messageId: string) {
      return this.prisma.conversation.update({
         where: { id: conversationId },
         data: { id: messageId },
      });
   }

   async setConversationFavorite(conversationId: string, isFavorite: boolean) {
      return this.prisma.conversation.update({
         where: { id: conversationId },
         data: { isFavorite },
      });
   }
}
