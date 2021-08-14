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
        type: Boolean,
        default: false,
    },
    about: {
        type: String,
    }
});

export default model("User", userSchema, "users");