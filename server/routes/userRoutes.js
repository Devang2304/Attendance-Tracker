import express from 'express';
import {loginUser,registerUser,getMe} from '../controller/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/me', protect ,getMe);
export default router;