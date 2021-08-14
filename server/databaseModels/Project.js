import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const projectSchema = new Schema({
    // { name, tagline, description, theme, tags, links, owner, isUnlisted, imageLinks }
    isUnlisted: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        max: 255,
    },
    tagline: {
        type: String,
        required: true,
        max: 500,
    },
    description: {
        type: String,
        required: true,
        max: 1200,
    },
    theme: {
        type: String,
        max: 50,
    },
    links: {
        type: Array,
    },
    tags: {
        type: Array,
    },
    owner: {
        type: Schema.Types.ObjectId,
    },
    imageLinks: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default model("Project", projectSchema, "projects");