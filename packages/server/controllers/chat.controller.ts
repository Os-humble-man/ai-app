import type { NextFunction, Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { BaseController } from './base.controller';
import { inject } from 'inversify';

export class ChatController extends BaseController {
   constructor(@inject('ChatService') private chatService: ChatService) {
      super();
   }

   handleMessage = async (req: Request, res: Response, next: NextFunction) => {
      const { prompt, conversationId, userId } = req.body;

      this.handleRequest(req, res, next, async () => {
         return this.chatService.sendMessage(prompt, conversationId!, userId);
      });
   };

   handleStreamMessage = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const { prompt, conversationId, userId } = req.body;

         res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control, Content-Type',
            'Transfer-Encoding': 'chunked',
         });

         res.write('event: connected\ndata: {"type":"connected"}\n\n');

         const stream = this.chatService.sendMessageStream(
            prompt,
            conversationId || this.generateConversationId(),
            userId
         );

         for await (const chunk of stream) {
            const eventData = {
               type: chunk.done ? 'done' : 'chunk',
               id: chunk.id,
               content: chunk.content,
               done: chunk.done,
            };

            res.write(`data: ${JSON.stringify(eventData)}\n\n`);

            if (typeof (res as any).flush === 'function') {
               (res as any).flush();
            }

            if (chunk.done) {
               break;
            }
         }

         res.end();
      } catch (error: any) {
         console.error('Error in streaming:', error);

         if (!res.headersSent) {
            res.writeHead(500, {
               'Content-Type': 'text/event-stream',
               'Cache-Control': 'no-cache',
               Connection: 'keep-alive',
            });
         }

         const errorData = {
            type: 'error',
            error: 'Failed to get response from AI',
            details: error.message,
         };

         res.write(`data: ${JSON.stringify(errorData)}\n\n`);
         res.end();

         next(error);
      }
   };

   // Méthode pour récupérer l'historique des conversations
   getConversations = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      this.handleRequest(req, res, next, async () => {
         // Implémentez cette méthode dans votre service si nécessaire
         // return this.chatService.getConversations(req.user.id);
         throw new Error('Not implemented');
      });
   };

   // Méthode pour récupérer une conversation spécifique
   getConversation = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;

      this.handleRequest(req, res, next, async () => {
         // Implémentez cette méthode dans votre service si nécessaire
         // return this.chatService.getConversation(id, req.user.id);
         throw new Error('Not implemented');
      });
   };

   // Méthode pour supprimer une conversation
   deleteConversation = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;

      this.handleRequest(req, res, next, async () => {
         // Implémentez cette méthode dans votre service si nécessaire
         // return this.chatService.deleteConversation(id, req.user.id);
         throw new Error('Not implemented');
      });
   };

   private generateConversationId(): string {
      return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
   }
}
