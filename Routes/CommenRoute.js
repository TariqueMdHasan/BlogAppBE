const express = require('express')
const router = express.Router();
const { createComment, getCommentsByBlog, deleteComment } = require('../Controllers/CommentController.js')
const protect = require('../Middleware/authMiddleware.js')

router.post('/', protect, createComment)
router.get('/:blogId', getCommentsByBlog)
router.delete('/:id', protect, deleteComment)


module.exports = router;