import Experience from "../../databaseModels/Experience.js";

export const fetchAllExperiences = async (req, res) => {
    try {
        const allExps = await Experience.find();
        res.status(200).json(allExps)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}