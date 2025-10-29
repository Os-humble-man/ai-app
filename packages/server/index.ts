import express from 'express';
import dotenv from 'dotenv';
// import router from './routes/routes';
import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler';
import { makeApiRouter } from './routes';
import { swaggerDocs } from './utils/swagger';

dotenv.config();

const app = express();
app.use(express.json());

makeApiRouter(app);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
   swaggerDocs(app, Number(PORT));
}

app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
});
