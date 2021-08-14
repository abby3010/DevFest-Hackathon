import User from "../../../databaseModels/User.js";
import dotenv from 'dotenv';
dotenv.config();

export const updateEducation = async (req, res) => {
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

        await User.updateOne(
            { _id: req.body.uid },
            {
                $set: {
                    educations: req.body.educations,
                }
            }
        );

        return res.status(200).json({ message: "Education details updated successfully!", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong! Refresh and try again.", error: error, success: false });
    }
}