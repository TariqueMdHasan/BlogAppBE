const express = require('express');
// const upload = 
const {registerUser, loginUser, deleteUser, updateUser, getUserData } = require('../Controllers/UserController.js')
const protect = require('../Middleware/authMiddleware.js')
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/delete', protect, deleteUser)
router.put('/update', protect, updateUser)
router.get('/getUser', protect, getUserData)


module.exports = router;