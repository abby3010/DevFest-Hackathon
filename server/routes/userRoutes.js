import express from 'express';
// File upload multer middleware for single file upload
import { createNewExperience } from '../controllers/createExperience/createNewExperience.js';
import { fetchUserData } from '../controllers/fetchUsers/fetchUserData.js';
import { likeExp } from '../controllers/likeExperience/likeExperience.js';
import { deleteExp } from '../controllers/deleteExperience/deleteExperience.js';


const router = express.Router();
router.post("/createnewexperience", createNewExperience);
router.delete('/:id', deleteExp);
router.patch('/:id/likeExp', likeExp);
router.post("/fetchuserdata", fetchUserData);

export default router;