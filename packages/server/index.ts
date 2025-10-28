import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
});
