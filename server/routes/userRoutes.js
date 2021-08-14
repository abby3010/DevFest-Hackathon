import express from 'express';
// File upload multer middleware for single file upload
import { singleFileUploadController } from '../controllers/uploadImages/uploadProjectImage.js';
import { fetchSingleProject } from '../controllers/fetchProjects/fetchSingleProject.js';
import { fetchUserData } from '../controllers/fetchUsers/fetchUserData.js';


const router = express.Router();

// router.post("/gethashtags", getHashTags);
// router.post("/getuserprojects", getUserProjects);
// router.post("/createnewproject", singleFileUploadController, createNewProject);
// router.post("/fetchproject", fetchSingleProject);
router.post("/fetchuserdata", fetchUserData);

export default router;