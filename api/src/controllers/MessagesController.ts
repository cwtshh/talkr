import { Server, Socket } from 'socket.io';

interface User {
    _id: string,
    name: string,
    email: string,
    number: string,
}

interface Message {
    text: string,
    sender: string,
    receiver: string,
    date: Date,
}

interface Conversation {
    _id: string,
    users: string[],
    messages: Message[],
    createdAt: string,
    updatedAt: string,
}

let users: string[] = [];

export const createPrivateRoom = (user1: string, user2: string) => {
    return [user1, user2].sort().join("_");
}

export const handleSocketConnection = (io: Server, socket: Socket) => {
    console.log("User connected", socket.id);
    socket.on('join', (user_id: string) => {
        users.push(user_id);
    })

    socket.on("send_message", (message: Message, reciver: string) => {
        const reciver_socket: string | undefined = users.find((user: string) => user === reciver);
        const sender_socket: string | undefined = users.find((user: string) => user === message.sender);
        if(reciver_socket && sender_socket) {
            const room = createPrivateRoom(message.sender, reciver);
            socket.join(room);
            io.to(room).socketsJoin(room);

            io.to(room).emit("message", message);
        }
    })

    socket.on('disconnect', () => {
        users = users.filter((user: string) => user !== socket.id);
        console.log("User disconnected", socket.id);
    })
}