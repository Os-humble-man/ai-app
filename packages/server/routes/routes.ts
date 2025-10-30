import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from '../controllers/chat.controller';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World From server' });
});

// router.post('/api/chat', chatController.handleMessage);
// router.post('/api/chat/stream', chatController.handleStreamMessage);

export default router;
