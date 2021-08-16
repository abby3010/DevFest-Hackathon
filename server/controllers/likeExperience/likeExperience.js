import Experience from "../../databaseModels/Experience.js";
import mongoose from 'mongoose';

export const likeExp = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const exp = await Experience.findById(id);

    const index = exp.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      exp.likes.push(req.userId);
    } else {
      exp.likes = exp.likes.filter((id) => id !== String(req.userId));
    }

    const updatedExp = await Experience.findByIdAndUpdate(id, exp, { new: true });
    res.status(200).json(updatedExp);
}