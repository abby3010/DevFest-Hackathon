// import multer from 'multer';
// import { uploadSingleImage } from './uploadSingleImage.js';

// export const uploadMultipleImages = async (files) => {
//     try {
//         var uploadStatus = [];
//         files.forEach(async (file) => {
//             const result = await uploadSingleImage(file);
//             uploadStatus.push(
//                 {
//                     cloudinaryID: result.cloudinaryID,
//                     url: result.url,
//                     success: result.success
//                 }
//             );
//         });

//         console.log(uploadStatus);
//     }
//     catch (e) {
//         console.error(e.message);
//     }

// }


// // Multer setup to handle files input
// var storage = multer.memoryStorage();

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         const allowedFileFormat = ["image/jpg", "image/png", "image/jpeg"];
//         if (allowedFileFormat.includes(file.mimetype)) {
//             callback(null, true);
//         } else {
//             callback(new Error("File format invalid"), false);
//         }
//     }
// });

// // Checking File input
// const multipleImageHandler = upload.array("images");

// export const multipleFileUploadController = (req, res, next) => {
//     multipleImageHandler(req, res, (error) => {
//         if (error) {
//             return res.status(422).send({ message: 'Image file format not correct' });
//         }
//         next();
//     });
// }