import Hashtags from "../../databaseModels/Hashtags.js";

export const getHashTags = async (req, res) => {
    try {
        // Fetch the tags from database and return in the response object
        const data = await Hashtags.findById("609ccc8946e454ad949baaec");
        return res.status(200).json({ tags: data.tags });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error });
    }
}