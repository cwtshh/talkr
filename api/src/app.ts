import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import router from './routes/Router';

const PORT = process.env.API_PORT || 3001;
const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World');
// });
connectDB();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


