import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import './strategies/google.strategy';
import './strategies/github.strategy';

import { errorHandler } from './middleware/errorHandler';
import { makeApiRouter } from './routes';
import { swaggerDocs } from './utils/swagger';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { logger, requestLogger } from './middleware/logger';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Validation of required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0 && isProduction) {
   console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
   process.exit(1);
}

// Security middlewareapp.use(
helmet({
   contentSecurityPolicy: {
      directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"],
         scriptSrc: ["'self'"],
      },
   },
});

// CORS configuration
app.use(
   cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || [
         'http://localhost:3000',
      ],
      credentials: true,
   })
);

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: isProduction ? 100 : 1000, // Different limit based on environment
   message: 'Too many requests from this IP',
   standardHeaders: true,
   legacyHeaders: false,
});

app.use(limiter);

// Parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);
app.use(
   morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } })
);
// API routes
makeApiRouter(app);

app.use(errorHandler);

// Swagger configuration (only in development)
if (!isProduction) {
   swaggerDocs(app, Number(PORT));
}

// Server startup
const server = app.listen(PORT, () => {
   logger.info(`🚀 Server started on port ${PORT}`);
   logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
   if (!isProduction) {
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
   }
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
   logger.info(`\n📭 Received ${signal} signal, shutting down server...`);

   server.close((err) => {
      if (err) {
         logger.error('Error occurred while closing the server:', err);
         process.exit(1);
      }

      logger.info('✅ Server stopped gracefully');
      process.exit(0);
   });

   // Force shutdown after 10 seconds
   setTimeout(() => {
      logger.error('⏰ Force shutdown after timeout');
      process.exit(1);
   }, 10000);
};

// Listen for shutdown signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (error) => {
   logger.error('🚨 Uncaught exception occurred:', error);
   process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
   logger.error('🚨 Unhandled promise rejection:', reason);
   process.exit(1);
});

export default app;
