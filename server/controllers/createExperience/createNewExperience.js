import Experience from "../../databaseModels/Experience.js";
import User from '../../databaseModels/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const createNewExperience = async (req, res) => {
    const { title, description, category, creator_id, creator_name, country, region, city } = req.body;

    // Checking for compulsory fields
    if (title == null) {
        return res.status(422).send({ message: "Project name is required!" });
    } else if (description == null) {
        return res.status(422).send({ message: "Project description is required!" });
    } else if (creator_name == null) {
        return res.status(422).send({ message: "Project tagline is required!" });
    }

    try {
        const existingUser = await User.findById(creator_id);
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        // Creating a new project document in database
        const result = await Experience.create({
            title: title,
            description: description,
            category: category,
            creator_id: creator_id,
            creator_name: creator_name,
            country: country,
            region: region,
            city: city,
        });

        return res.status(200).json({ message: "Project created successfully!" });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Something went wrong. Retry!" })
    }
}