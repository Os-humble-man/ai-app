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
};
