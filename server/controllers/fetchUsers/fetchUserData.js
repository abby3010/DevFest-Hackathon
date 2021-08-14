import User from "../../databaseModels/User.js";
import Project from "../../databaseModels/Project.js";

export const fetchUserData = async (req, res) => {
    try {
        // Only 2 parameters are required, "uid" and "privateKey"
        if (req.body.uid == null)
            return res.status(404).json({ message: "User not found!" });
        if (req.body.privateKey == null)
            return res.status(404).json({ message: "Unauthorized update!" });

        // Fetch the user's document from database
        const user = await User.findById(req.body.uid);

        // Find projects of the user
        const projects = await Project.find({
            _id: {
                $in: user.projects
            }
        });

        if (req.body.privateKey != user.privateKey) {
            // SEND RESTRICTED DATA

            let response = {
                firstName: user.firstName,
                lastName: user.lastName,
                about: user.about,
                imageUrl: user.imageUrl,
                country: user.country,
                region: user.region,
                city: user.city,
            }

            return res.status(200).json({ user: response });
        }

        // SEND COMPLETE DATA
        var response = {
            firstName: user.firstName,
            lastName: user.lastName,
            about: user.about,
            email: user.email,
            imageUrl: user.imageUrl,
            country: user.country,
            region: user.region,
            city: user.city,
        }
        return res.status(200).json({ user: response });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong.", error: error });
    }
}