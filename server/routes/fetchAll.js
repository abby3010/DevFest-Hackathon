import express from 'express';
import { fetchAllExperiences } from '../controllers/fetchExperiences/fetchAllExperiences.js';

const router = express.Router();
router.get('/', fetchAllExperiences);
export default router;