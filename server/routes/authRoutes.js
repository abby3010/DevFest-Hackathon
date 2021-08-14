import express from 'express';
import { login, signUp, googleAuth } from '../controllers/auth/user.js';

const router = express.Router();

// login routes
router.post("/login", login);
router.post("/signUp", signUp);
router.post("/googleAuth", googleAuth);

export default router;