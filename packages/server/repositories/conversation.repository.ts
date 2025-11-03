import type { Role } from '../generated/prisma/enums';
import { BaseRepository } from './base.repository';

interface Message {
   role: 'user' | 'assistant';
   content: string;
   model_used?: string;
   token_count?: number;
}

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
         include: {
            messages: {
               orderBy: {
                  createdAt: 'asc',
               },
            },
         },
      });
   }

   async findByUserId(userId: string) {
      return this.prisma.conversation.findMany({
         where: { userId },
         include: {
            messages: {
               orderBy: {
                  createdAt: 'asc',
               },
               take: 1,
            },
         },
      });
   }

   async deleteById(conversationId: string) {
      return this.prisma.conversation.delete({
         where: { id: conversationId },
      });
   }

   async getConversationMessages(conversationId: string): Promise<Message[]> {
      const conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
         include: {
            messages: {
               orderBy: {
                  createdAt: 'asc',
               },
            },
         },
      });

      if (!conversation?.messages) {
         return [];
      }

      return conversation.messages.map((msg) => ({
         role: msg.role.toLowerCase() as 'user' | 'assistant',
         content: msg.content,
      }));
   }

   async saveConversationMessages(conversationId: string, messages: Message[]) {
      const conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
      });

      if (!conversation) {
         throw new Error(`Conversation ${conversationId} not found`);
      }

      await this.prisma.$transaction(async (tx) => {
         await tx.message.deleteMany({
            where: { conversationId },
         });

         for (const message of messages) {
            await tx.message.create({
               data: {
                  conversationId,
                  role: message.role.toUpperCase() as Role,
                  content: message.content,
                  modelUsed: message.model_used,
                  tokenCount: message.token_count,
               },
            });
         }
      });
   }

   async ensureConversationExists(
      conversationId: string,
      userId: string,
      title: string = 'Nouvelle conversation',
      model: string = 'gpt-4o-mini'
   ) {
      if (!userId) {
         throw new Error('userId is required to create a conversation');
      }

      let conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
      });

      if (!conversation) {
         conversation = await this.prisma.conversation.create({
            data: {
               id: conversationId,
               userId,
               title,
               model,
            },
         });
      }

      return conversation;
   }

   async getConversationTitle(conversationId: string): Promise<string | null> {
      const conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
         select: { title: true },
      });
      return conversation?.title || null;
   }

   async listUserConversations(userId: string) {
      return this.prisma.conversation.findMany({
         where: { userId },
         orderBy: { updatedAt: 'desc' },
      });
   }

   async getUserConversationById(conversationId: string) {
      return this.prisma.conversation.findUnique({
         where: { id: conversationId },
         include: {
            messages: {
               orderBy: {
                  createdAt: 'asc',
               },
            },
         },
      });
   }

   async deleteConversation(conversationId: string): Promise<void> {
      await this.prisma.conversation.delete({
         where: { id: conversationId },
      });
      await this.prisma.message.deleteMany({
         where: { conversationId },
      });
   }

   async setConversationTitle(
      conversationId: string,
      title: string
   ): Promise<void> {
      await this.prisma.conversation.update({
         where: { id: conversationId },
         data: { title },
      });
   }

   async setConversationFavorite(conversationId: string, isFavorite: boolean) {
      return this.prisma.conversation.update({
         where: { id: conversationId },
         data: { isFavorite },
      });
   }
}
