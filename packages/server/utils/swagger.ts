import type { Express, Request, Response } from 'express';
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: swaggerJSdoc.Options = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'AI App',
         version: '1.0.0',
         description:
            'Full-stack AI chat application demonstrating advanced skills in modern web development. The application allows users to converse with an AI (GPT-4o-mini) through an intuitive interface with real-time response streaming. Built with a robust Node.js and Express backend, it showcases expertise in RESTful API design, secure user authentication, and efficient database management using Prisma ORM. The frontend is crafted with React and TypeScript, emphasizing responsive design and seamless user experience. This project highlights proficiency in integrating AI technologies, handling asynchronous operations, and deploying scalable web applications.',
         license: {
            name: 'LICENSE - MIT',
            url: 'https://github.com/Os-humble-man/ai-app',
         },
         contact: {
            name: 'Oscar Kanangila',
            url: 'https://github.com/Os-humble-man',
            email: 'Oscarkanangila01@gmail.com',
         },
      },
      components: {
         securitySchemas: {
            BearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT',
            },
         },
      },
      security: [
         {
            BearerAuth: [],
         },
      ],
   },
   apis: ['./routes/**/*.ts'],
};

export const swaggerSpec = swaggerJSdoc(options);

export function swaggerDocs(app: Express, port: number) {
   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
   app.get('/api-docs.json', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
   });

   console.warn(`Swagger Docs available at http://localhost:${port}/api-docs`);
}
