import Project from "../../databaseModels/Project.js";
import User from '../../databaseModels/User.js';
import Hashtags from '../../databaseModels/Hashtags.js';
import { uploadProjectImage } from "../uploadImages/uploadProjectImage.js";
import dotenv from 'dotenv';
dotenv.config();

export const createNewProject = async (req, res) => {
    const { name, tagline, description, theme, links, owner, tags, isUnlisted } = req.body;

    // Checking for compulsory fields
    if (name == null) {
        return res.status(422).send({ message: "Project name is required!" });
    } else if (description == null) {
        return res.status(422).send({ message: "Project description is required!" });
    } else if (tagline == null) {
        return res.status(422).send({ message: "Project tagline is required!" });
    }

    try {
        const existingUser = await User.findById(owner);
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });
        var image;

        if (req.file == null) {
            image = process.env.DEFAULT_PROJECT_IMAGE;
        } else {
            const uploadResult = await uploadProjectImage(req.file);
            if (uploadResult.success) {
                image = uploadResult.url;
            }
            else {
                return res.status(500).json({ message: "Try again! Image not uploaded properly." });
            }
        }


        // { name, tagline, description, theme, tags, newTags, links, owner, isUnlisted, imageLinks }

        await Hashtags.updateOne(
            { _id: "609ccc8946e454ad949baaec" },
            { $addToSet: { tags: [req.body.newTags] } }
        );


        // Creating a new project document in database
        const result = await Project.create({
            name: name,
            tagline: tagline,
            description: description,
            theme: theme,
            tags: tags,
            links: links,
            owner: owner,
            isUnlisted: isUnlisted,
            imageLinks: [image],
        });

        // Adding the above created project refernce in the document of it's owner
        await User.updateOne(
            { _id: owner },
            { $addToSet: { projects: [result._id] } }
        );

        return res.status(200).json({ message: "Project created successfully!" });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Something went wrong. Retry!" })
    }
}