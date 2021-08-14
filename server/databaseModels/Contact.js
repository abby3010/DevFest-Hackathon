import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default model("Contacts", contactSchema, "contacts");