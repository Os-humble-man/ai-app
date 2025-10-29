import express from 'express';
import dotenv from 'dotenv';
// import router from './routes/routes';
import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler';
import { makeApiRouter } from './routes';

dotenv.config();

const app = express();
app.use(express.json());

makeApiRouter(app);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
});
