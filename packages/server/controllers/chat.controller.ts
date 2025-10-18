import z from 'zod';
import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';

const ConversationSchema = z.object({
   conversationId: z.string().uuid().optional(),
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
});

export const chatController = {
   async handleMessage(req: Request, res: Response) {
      const { prompt, conversationId } = req.body;
      const result = ConversationSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ errors: result.error.format() });
      }

      try {
         const assistantMessage = await chatService.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message: assistantMessage });
      } catch (error) {
         console.error('Error calling OpenAI:', error);
         res.status(500).json({ error: 'Failed to get response from AI' });
      }
   },

   async handleStreamMessage(req: Request, res: Response) {
      const { prompt, conversationId } = req.body;
      const result = ConversationSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ errors: result.error.format() });
      }

      try {
         // Set headers for Server-Sent Events
         res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
         });

         // Send initial connection event
         res.write('data: {"type":"connected"}\n\n');

         const stream = chatService.sendMessageStream(prompt, conversationId);

         for await (const chunk of stream) {
            const data = JSON.stringify({
               type: chunk.done ? 'done' : 'chunk',
               id: chunk.id,
               content: chunk.content,
            });

            res.write(`data: ${data}\n\n`);

            if (chunk.done) {
               break;
            }
         }

         res.end();
      } catch (error) {
         console.error('Error in streaming:', error);
         const errorData = JSON.stringify({
            type: 'error',
            error: 'Failed to get response from AI',
         });
         res.write(`data: ${errorData}\n\n`);
         res.end();
      }
   },
};
