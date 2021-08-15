import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const experienceSchema = new Schema({
    // { name, tagline, description, theme, tags, links, owner, isUnlisted, imageLinks }
    title: {
        type: String,
        required: true,
        max: 255,
    },
    description: {
        type: String,
        required: true,
        max: 1200,
    },
    category: {
        type: String,
        max: 50,
    },
    creator_id: {
        type: String,
    },
    creator_name: {
        type: String,
    },
    country: {
        type: String,
    },
    region: {
        type: String,
    },
    city: {
        type: String,
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default model("Experience", experienceSchema, "experiences");