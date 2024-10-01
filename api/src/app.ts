import express, { Application, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './config/db';
import router from './routes/Router';
import { handleSocketConnection } from './controllers/MessagesController';

const PORT = process.env.API_PORT || 3001;
const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    handleSocketConnection(io, socket);
})

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


