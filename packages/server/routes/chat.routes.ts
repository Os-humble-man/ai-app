import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { container } from '../container';
import { validate } from '../middleware/validate';
import { ConversationSchema } from '../schema/conversation.schema';

const chatRoutes = Router();
const chatController = container.get<ChatController>('ChatController');

// POST /chat - Send message (non-streaming)
chatRoutes.post(
   '/',
   validate(ConversationSchema.createConversation),
   chatController.handleMessage
);

// POST /chat/stream - Send message (streaming)
chatRoutes.post(
   '/stream',
   validate(ConversationSchema.createConversation),
   chatController.handleStreamMessage
);

// POST /chat/conversations - Get all user conversations
chatRoutes.post(
   '/conversations',
   validate(ConversationSchema.getConversation),
   chatController.getConversations
);

// GET /chat/conversation/:id - Get conversation by ID
chatRoutes.get(
   '/conversation/:id',
   validate(ConversationSchema.idParam),
   chatController.getConversation
);

// DELETE /chat/conversation/:id - Delete conversation
chatRoutes.delete(
   '/conversation/:id',
   validate(ConversationSchema.idParam),
   chatController.deleteConversation
);

// POST /chat/conversation/toggle-favorite - Toggle favorite status
chatRoutes.post(
   '/conversation/toggle-favorite',
   validate(ConversationSchema.toggleConversation),
   chatController.toggleFavorite
);

chatRoutes.post(
   '/conversation/move-folder',
   chatController.moveConversationToFolder
);

export { chatRoutes };
