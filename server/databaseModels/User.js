import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        max: 1024,
        min: 6
    },
    privateKey: {
        type: String,
        max: 1024,
        min: 6
    },
    signUpTimeStamp: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
    },
    featured: {
        type: Array,
        default: [],
    },
    projects: {
        type: Array,
        default: [],
    },
    companies: {
        type: Array,
        default: [],
    },
    skills: {
        type: Array,
        default: [],
    },
    educations: {
        type: Array,
        default: [],
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
    termsAgreed: {
        type: String,
        default: false,
    },
    about: {
        type: String,
        default: "Hi there 👋",
    }

});

export default model("User", userSchema, "users");