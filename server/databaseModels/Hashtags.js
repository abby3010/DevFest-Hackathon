import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const hashTagsSchema = new Schema({
    tags: {
        type: Array,
        default: [],
    },

});

export default model("Hashtags", hashTagsSchema, "hashtags");