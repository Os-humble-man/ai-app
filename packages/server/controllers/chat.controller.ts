import type { NextFunction, Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { BaseController } from './base.controller';
import { inject } from 'inversify';

export class ChatController extends BaseController {
   constructor(@inject('ChatService') private chatService: ChatService) {
      super();
   }

   handleMessage = async (req: Request, res: Response, next: NextFunction) => {
      console.log('Handle message :', req.body);
      const { prompt, conversationId, senderId } = req.body;
      const actualUserId = senderId;

      this.handleRequest(req, res, next, async () => {
         return this.chatService.sendMessage(
            prompt,
            conversationId!,
            actualUserId
         );
      });
   };

   handleStreamMessage = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      console.log('stream', req.body);
      try {
         const { prompt, conversationId, senderId } = req.body;
         const actualUserId = senderId;

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
            actualUserId
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

   // Method for retrieving conversation history
   getConversations = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      this.handleRequest(req, res, next, async () => {
         return this.chatService.getConversationList(req.body.userId);
      });
   };

   getConversation = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;

      this.handleRequest(req, res, next, async () => {
         return this.chatService.getUserConversationById(id!);
      });
   };

   deleteConversation = async (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      const { id } = req.params;

      this.handleRequest(req, res, next, async () => {
         return this.chatService.deleteConversation(id!);
      });
   };

   toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
      const { conversationId, isFavorite } = req.body;

      this.handleRequest(req, res, next, async () => {
         return this.chatService.toggleFavorite(conversationId!, isFavorite);
      });
   };

   private generateConversationId(): string {
      return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
   }
}
