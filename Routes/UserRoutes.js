const express = require('express');
// const upload = 
const {registerUser, loginUser} = require('../Controllers/UserController.js')

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router;