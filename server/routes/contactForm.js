import dotenv from 'dotenv';
import Contacts from '../databaseModels/Contact.js';
dotenv.config();

export const contactForm = async (req, res) => {
    try {
        // Check for all the required data
        if (req.body.name == null)
            return res.status(404).json({ message: "Please add input your name!", success: false });

        if (req.body.email == null)
            return res.status(404).json({ message: "Please add your email address!", success: false });

        if (req.body.message == null)
            return res.status(404).json({ message: "Please add your message for us!", success: false });

        console.log(req.body.message);
        await Contacts.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        return res.status(200).json({ message: "Details saved successfully!", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong! Refresh and try again.", error: error, success: false });
    }
}