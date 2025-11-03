import z from 'zod';

export const ConversationSchema = {
   createConversation: {
      body: z.object({
         prompt: z
            .string()
            .trim()
            .min(1, 'Prompt cannot be empty')
            .max(1000, 'Prompt is too long'),
         conversationId: z.string('Invalid conversation ID').optional(),
         senderId: z.string('Invalid user ID'),
      }),
   },
   idParam: {
      params: z.object({
         id: z.string('Invalid conversation ID'),
      }),
   },
   getConversation: {
      body: z.object({
         userId: z
            .string('Invalid user ID')
            .trim()
            .min(1, 'User ID is required'),
      }),
   },
   toggleConversation: {
      body: z.object({
         conversationId: z
            .string('Invalid conversation ID')
            .trim()
            .min(1, 'Conversation ID is required'),
         isFavorite: z.boolean('isFavorite must be a boolean'),
      }),
   },
};
