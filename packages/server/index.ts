import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World From server' });
});

app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
});
