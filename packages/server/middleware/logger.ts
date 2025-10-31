import type { NextFunction, Request, Response } from 'express';
import winston from 'winston';

export const logger = winston.createLogger({
   level: process.env.LOG_LEVEL || 'info',
   format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
   ),
   transports: [
      new winston.transports.File({
         filename: 'logs/error.log',
         level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
   ],
});

if (process.env.NODE_ENV !== 'production') {
   logger.add(
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         ),
      })
   );
}

export const requestLogger = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const start = Date.now();

   res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('Requête HTTP', {
         method: req.method,
         url: req.url,
         status: res.statusCode,
         duration: `${duration}ms`,
         ip: req.ip,
         userAgent: req.get('User-Agent'),
      });
   });

   next();
};
