const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Uploads')); // Save uploads in the 'Uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate unique file name
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Allowed file extensions
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
        const mimetype = fileTypes.test(file.mimetype); // Check MIME type

        if (extname && mimetype) {
            cb(null, true); // File is valid
        } else {
            cb(new Error('Only .jpg, .jpeg, and .png files are allowed!')); // File is invalid
        }
    },
});

module.exports = upload;
