import Project from "../../databaseModels/Project.js";

export const getUserProjects = async (req, res) => {
    try {

        // Fetch the projects from database and return in the response object
        const data = await Project.find({ owner: req.body.uid });
        return res.status(200).json({ projects: data });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error });
    }
}