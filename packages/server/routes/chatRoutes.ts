import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { container } from '../container';

const chatRoutes = Router();

const chatController = container.get<ChatController>('ChatController');

chatRoutes.post('/', chatController.handleMessage);
chatRoutes.post('/stream', chatController.handleStreamMessage);

export { chatRoutes };
