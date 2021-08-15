// import Project from "../../databaseModels/Project.js";

// export const fetchSingleProject = async (req, res) => {
//     try {
//         if (req.body.uid == null)
//             return res.status(404).json({ message: "User not found!" });
//         if (req.body.projectID == null) {
//             return res.status(404).json({ message: "Project not found!" });
//         }
//         // Fetch the single project from database and return in the response object
//         const project = await Project.findById(req.body.projectID);
//         if (req.body.uid != project.owner) {
//             // Update the views of the project
//             await Project.updateOne(
//                 { _id: project._id },
//                 { $inc: { views: 1 } }
//             );
//         }
//         return res.status(200).json({ project: project });

//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong.", error: error });
//     }
// }