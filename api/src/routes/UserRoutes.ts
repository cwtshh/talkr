import express from 'express';
import { register_user, login_user, logout_user, get_all_users, add_contact, get_my_conversations, get_conversation } from '../controllers/UserController';

const user_router = express();

user_router.get('/get/all', get_all_users);
user_router.get('/get/conversations/:id', get_my_conversations);
user_router.get('/get/conversation/:sender_id/:reciver_id', get_conversation);

user_router.post('/register', register_user);
user_router.post('/login', login_user);
user_router.post('/logout', logout_user);
user_router.post('/send/message', )
user_router.post('/add/contact', add_contact);

export default user_router;