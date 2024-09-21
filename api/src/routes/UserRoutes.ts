import express from 'express';
import { register_user, login_user, logout_user, get_all_users } from '../controllers/UserController';

const user_router = express();

user_router.get('/get/all', get_all_users);

user_router.post('/register', register_user);
user_router.post('/login', login_user);
user_router.post('/logout', logout_user);
user_router.post('/send/message', )

export default user_router;