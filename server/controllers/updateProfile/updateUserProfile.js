import User from "../../databaseModels/User.js";
import { deleteImage } from "../deleteImage/deleteProfileImage.js";
import { uploadProfileImage } from "../uploadImages/uploadProfile.js";
import dotenv from 'dotenv';
dotenv.config();


export const updateProfile = async (req, res) => {
    try {
        // 2 parameters are required, "uid" and "privateKey"
        if (req.body.privateKey == null)
            return res.status(404).json({ message: "Unauthorized update!", success: false });

        if (req.body.uid == null)
            return res.status(404).json({ message: "User not found!", success: false });

        // Fetch the user's document from database
        const user = await User.findById(req.body.uid);

        // Check the private key
        if (req.body.privateKey != user.privateKey)
            return res.status(401).json({ message: 'Unauthorized update!', success: false });

        var image;

        if (req.file) {

            // Delete the previously stored image first
            var url = new URL(user.imageUrl);
            if (url.host == "res.cloudinary.com") {
                let pathList = url.pathname.split('/');
                let public_id = pathList[pathList.length - 1].split('.')[0];
                if (public_id != process.env.DEFAULT_PROFILE_ID) {
                    await deleteImage(public_id);
                }
            }

            // Upload the new image file
            const uploadResult = await uploadProfileImage(req.file);
            if (uploadResult.success) {
                image = uploadResult.url;
            }
            else {
                return res.status(500).json({ message: "Try again! Image not uploaded properly.", success: false });
            }

        } else {
            if (req.body.imageUrl == null) {
                image = process.env.DEFAULT_PROFILE;
            } else {
                image = req.body.imageUrl;
            }
        }

        await User.updateOne(
            { _id: req.body.uid },
            {
                $set: {
                    imageUrl: image,
                    country: req.body.country,
                    region: req.body.region,
                    city: req.body.city,
                    termsAgreed: req.body.termsAgreed,
                }
            }
        );

        return res.status(200).json({ message: "Profile updated successfully!", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!", error: error, success: false });
    }
}