import Project from "../../databaseModels/Project.js";
import User from "../../databaseModels/User.js";
import dotenv from 'dotenv';
import { deleteImage } from "../deleteImage/deleteProjectImage.js";
import { uploadProjectImage } from "../uploadImages/uploadProjectImage.js";
dotenv.config();

export const updateProjectDetails = async (req, res) => {
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
            return res.status(401).json({ message: 'You do not have access to edit!', success: false });


        const project = await Project.findById(req.body.projectID);

        var image;
        if (req.file) {
            // Delete the previously stored image first
            var url = new URL(project.imageLinks[0]);
            if (url.host == "res.cloudinary.com") {
                let pathList = url.pathname.split('/');
                let public_id = pathList[pathList.length - 1].split('.')[0];
                if (public_id != process.env.DEFAULT_PROJECT_ID) {
                    await deleteImage(public_id);
                }
            }

            // Upload the new image file
            const uploadResult = await uploadProjectImage(req.file);
            if (uploadResult.success) {
                image = uploadResult.url;
            }
            else {
                return res.status(500).json({ message: "Try again! Image not uploaded properly.", success: false });
            }

        } else {
            image = project.imageLinks[0];
        }


        // UpdateOne returns only the metadata, while findOneAndUpdate returns the updated document.
        const updatedProject = await Project.findOneAndUpdate(
            { _id: req.body.projectID },
            {
                $set: {
                    name: req.body.name,
                    tagline: req.body.tagline,
                    theme: req.body.theme,
                    "imageLinks.0": image
                }
            }
        );

        return res.status(200).json({ message: "Details updated successfully!", success: true , imageLinks: updatedProject.imageLinks });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong! Refresh and try again.", error: error, success: false });
    }
}