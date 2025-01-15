const express = require('express');
// const upload = 
const {registerUser, loginUser, deleteUser, updateUser, getUserData, uploadProfilePicture, getUserProfile } = require('../Controllers/UserController.js')
const protect = require('../Middleware/authMiddleware.js')
const { profilePictureUpload } = require('../Middleware/uploadMiddleware.js')
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/delete', protect, deleteUser)
router.put('/update', protect, updateUser)
router.get('/getUser', protect, getUserData)

// Get user profile
router.get('/profile', protect, getUserProfile);

// Upload profile picture
router.post('/profile/upload', protect, profilePictureUpload.single('profilePicture'), uploadProfilePicture);


module.exports = router;