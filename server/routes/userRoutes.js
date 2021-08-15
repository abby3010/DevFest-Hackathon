import express from 'express';
// File upload multer middleware for single file upload
import { singleFileUploadController } from '../controllers/uploadImages/uploadProjectImage.js';
import { createNewExperience } from '../controllers/createExperience/createNewExperience.js';
// import { fetchSingleProject } from '../controllers/fetchProjects/fetchSingleProject.js';
import { fetchUserData } from '../controllers/fetchUsers/fetchUserData.js';
import { likeExp } from '../controllers/likeExperience/likeExperience.js';


const router = express.Router();
// router.post("/gethashtags", getHashTags);
// router.post("/getuserprojects", getUserProjects);
router.post("/createnewexperience", singleFileUploadController, createNewExperience);
// router.post("/fetchproject", fetchSingleProject);
router.patch('/:id/likeExp', likeExp);
router.post("/fetchuserdata", fetchUserData);

export default router;