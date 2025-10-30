import z from 'zod';

export const ConversationSchema = {
   createConversation: {
      body: z.object({
         prompt: z
            .string()
            .trim()
            .min(1, 'Prompt cannot be empty')
            .max(1000, 'Prompt is too long'),
         conversationId: z.uuid('Invalid conversation ID'),
      }),
   },
};
