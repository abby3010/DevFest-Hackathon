import express from 'express';
import { updateDetails } from '../controllers/updateProfile/sectionUpdates/upateDetails.js';
import { profileUploadController } from '../controllers/uploadImages/uploadProfile.js';
import { updateProfile } from '../controllers/updateProfile/updateUserProfile.js';
import { updateImage } from '../controllers/updateProfile/sectionUpdates/updateImage.js';

const router = express.Router();

// update the profile from setProfile screen on UI
router.post("/updateprofile", profileUploadController, updateProfile);

// update profile sections routes
router.post("/profileImage", profileUploadController, updateImage);
router.post("/profileDetails", updateDetails);


export default router;