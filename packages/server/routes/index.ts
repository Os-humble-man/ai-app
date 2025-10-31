import { Router } from 'express';
import type { Application } from 'express';
import { userRoutes } from './user.routes';
import { chatRoutes } from './chat.routes';
import { HttpStatus } from '../utils/HttpStatus';
import { authRoutes } from './auth.routes';

const makeApiRouter = (app: Application) => {
   const rootRouter = Router();
   const apiRouter = Router();

   // Health check route
   apiRouter.get('/health', (req, res) => {
      res.status(HttpStatus.OK).json({
         status: 'OK',
         timestamp: new Date().toISOString(),
         environment: process.env.NODE_ENV || 'development',
      });
   });

   apiRouter.use('/users', userRoutes);
   apiRouter.use('/chat', chatRoutes);
   apiRouter.use('/auth', authRoutes);

   apiRouter.use((req, res) => {
      res.status(HttpStatus.NOT_FOUND).json({
         error: 'Route not found',
         path: req.originalUrl,
         method: req.method,
         message: 'The requested API endpoint does not exist',
      });
   });

   rootRouter.use('/api', apiRouter);

   //* Register routes into the express app
   app.use(rootRouter);
};

export { makeApiRouter };
