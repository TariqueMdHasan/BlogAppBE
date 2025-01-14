const express = require('express');
const router = express.Router();
const {createBlog, getAllBlogs, updateBlog, fetchBlogById, deleteBlog, getUserBlog } = require('../Controllers/BlogController.js');
const protect = require('../Middleware/authMiddleware.js')
const upload = require('../Middleware/uploadMiddleware.js');

router.post('/', protect, upload.single('image'), createBlog );
router.get('/userBlogs', protect, getUserBlog)
router.get('/', getAllBlogs)
router.put('/:id', protect, upload.single('image'), updateBlog) 
router.get('/:id', fetchBlogById)
router.delete('/:id', protect, deleteBlog)



module.exports = router;