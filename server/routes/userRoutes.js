import express from 'express';
import { createNewProject } from '../controllers/createProject/createNewProject.js';
import { getHashTags } from '../controllers/getHashTags/getHashTags.js';
// File upload multer middleware for single file upload
import { singleFileUploadController } from '../controllers/uploadImages/uploadProjectImage.js';
import { getUserProjects } from '../controllers/fetchProjects/getUserProjects.js';
import { fetchSingleProject } from '../controllers/fetchProjects/fetchSingleProject.js';
import { fetchUserData } from '../controllers/fetchUsers/fetchUserData.js';


const router = express.Router();

router.post("/gethashtags", getHashTags);
router.post("/getuserprojects", getUserProjects);
router.post("/createnewproject", singleFileUploadController, createNewProject);
router.post("/fetchproject", fetchSingleProject);
router.post("/fetchuserdata", fetchUserData);

export default router;