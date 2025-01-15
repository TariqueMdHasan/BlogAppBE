// const multer = require('multer');
// const path = require('path');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const storage = multer.memoryStorage();
// const cloudinary = require('cloudinary').v2;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../Uploads')); // Save uploads in the 'Uploads' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Generate unique file name
//     },
// });

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,

// })

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png/; // Allowed file extensions
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
//         const mimetype = fileTypes.test(file.mimetype); // Check MIME type

//         if (extname && mimetype) {
//             cb(null, true); // File is valid
//         } else {
//             cb(new Error('Only .jpg, .jpeg, and .png files are allowed!')); // File is invalid
//         }
//     },
// });


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'blogs',
//         allowedFormats: ['jpg', 'jpeg', 'png']
//     }
// })

// const upload = multer({storage})

// module.exports = upload;





const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to create Cloudinary storage dynamically
const createCloudinaryStorage = (folder) =>
    new CloudinaryStorage({
        cloudinary,
        params: {
            folder, // Dynamic folder name
            allowedFormats: ['jpg', 'jpeg', 'png'], // Allowed file formats
        },
    });

// Middleware factory for different types of uploads
const uploadMiddleware = (folder) => {
    const storage = createCloudinaryStorage(folder);

    return multer({
        storage,
        limits: {
            fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
        },
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);
            }
        },
    });
};

// Create separate middlewares for profile pictures and blog images
const profilePictureUpload = uploadMiddleware('profile_pictures'); // Folder: 'profile_pictures'
const blogImageUpload = uploadMiddleware('blogs'); // Folder: 'blogs'

module.exports = { profilePictureUpload, blogImageUpload };
