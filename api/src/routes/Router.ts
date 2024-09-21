import express from 'express';
import user_router from './UserRoutes';

const router = express();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/user', user_router);

export default router;