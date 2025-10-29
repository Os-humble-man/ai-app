import { Router } from 'express';
import type { Application } from 'express';
import { userRoutes } from './userRoutes';

const makeApiRouter = (app: Application) => {
   const rootRouter = Router();
   const apiRouter = Router();

   rootRouter.use('/api', apiRouter);

   //* Register API routes
   apiRouter.use('/users', userRoutes);
   //   apiRouter.use("/auth", authRoutes);

   //* Register routes into the express app
   app.use(rootRouter);
};

export { makeApiRouter };
