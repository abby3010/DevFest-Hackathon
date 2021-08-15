import Experience from "../../databaseModels/Experience.js";
import mongoose from 'mongoose';

export const deleteExp = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id found');

    await Experience.findByIdAndRemove(_id); 

    res.json({message: 'Post Deleted Succesfully'})
}