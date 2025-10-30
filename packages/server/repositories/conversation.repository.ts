import type { Role } from '../generated/prisma/enums';
import { BaseRepository } from './base.repository';

interface Message {
   role: 'user' | 'assistant';
   content: string;
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
               take: 1, // Pour optimiser les performances
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

      // Convertir les messages au format attendu par le service
      return conversation.messages.map((msg) => ({
         role: msg.role.toLowerCase() as 'user' | 'assistant',
         content: msg.content,
      }));
   }

   async saveConversationMessages(conversationId: string, messages: Message[]) {
      // Supprimer les messages existants pour cette conversation
      await this.prisma.message.deleteMany({
         where: { conversationId },
      });

      // Recréer tous les messages
      for (const message of messages) {
         await this.prisma.message.create({
            data: {
               conversationId,
               role: message.role.toUpperCase() as Role,
               content: message.content,
            },
         });
      }
   }

   async getConversationTitle(conversationId: string): Promise<string | null> {
      const conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
         select: { title: true },
      });
      return conversation?.title || null;
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
