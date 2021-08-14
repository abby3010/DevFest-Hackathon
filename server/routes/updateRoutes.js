import express from 'express';
import { updateDetails } from '../controllers/updateProfile/sectionUpdates/upateDetails.js';
import { profileUploadController } from '../controllers/uploadImages/uploadProfile.js';
import { updateProfile } from '../controllers/updateProfile/updateUserProfile.js';
import { updateImage } from '../controllers/updateProfile/sectionUpdates/updateImage.js';
import { singleFileUploadController } from '../controllers/uploadImages/uploadProjectImage.js';
import { updateProjectDetails } from '../controllers/updateProject/updateDetails.js';
import { updateDescription } from '../controllers/updateProject/updateDescription.js';

const router = express.Router();

// update the profile from setProfile screen on UI
router.post("/updateprofile", profileUploadController, updateProfile);

// update profile sections routes
router.post("/profileImage", profileUploadController, updateImage);
router.post("/profileDetails", updateDetails);

// update user's single Project
router.post("/projectDetails", singleFileUploadController, updateProjectDetails);
router.post("/projectDescription", updateDescription);


export default router;