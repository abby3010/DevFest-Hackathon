import path from 'path';
import multer from 'multer';
import DatauriParser from 'datauri/parser.js';
import cloudinary from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();

const parser = new DatauriParser();

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const cloudinaryUpload = async (file) => {
    return cloudinary.v2.uploader.upload(file, {
        upload_preset: 'post_img_store',
    });
}

const formatBufferTo64 = file => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}

export const uploadProjectImage = async (file) => {
    try {
        if (!file) { throw new Error('Image not found') }

        const fileBase64 = formatBufferTo64(file);

        const uploadResult = await cloudinaryUpload(fileBase64.content);
        return {
            success: true,
            cloudinaryID: uploadResult.public_id,
            url: uploadResult.secure_url,
        };
    }
    catch (e) {
        return {
            success: false,
            message: e.message,
        };
    }

}

// Multer setup to handle file input
var storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedFileFormat = ["image/jpg", "image/png", "image/jpeg"];
        if (allowedFileFormat.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
});

// Checking File input
const singleImageHandler = upload.single("image");

export const singleFileUploadController = (req, res, next) => {
    singleImageHandler(req, res, (error) => {
        if (error) {
            console.log(error);
            return res.status(422).send({ message: 'Image file format not correct. Allowed formats are jpg, png, and jpeg' });
        }
        next();
    });
}