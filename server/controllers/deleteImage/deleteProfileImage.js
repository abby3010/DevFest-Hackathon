import cloudinary from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();


// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImage = async (public_id) => {
    try {
        if (!public_id) { throw new Error('public_id of image not found') }

        await cloudinary.v2.uploader.destroy("profile_images/" + public_id, { invalidate: true, resource_type: "image" });

        return {
            success: true,
            message: "Image deleted successfully"
        };
    }
    catch (e) {
        return {
            success: false,
            message: e.message,
        };
    }

}

