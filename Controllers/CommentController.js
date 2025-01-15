const Comment = require('../Models/CommentModel.js')
const Blog = require('../Models/BlogModel.js')
const mongoose = require('mongoose')

// create comment
// get all comments for that blog
// delete comment by commentator
// delete comment by blog author (later)


// create comment
const createComment = async(req, res) => {
    try{
        // get blogid and commenttext from body
        // check if content exist
        // check if blog exist
        // save comment text and blog id  in constant
        // save

        const { text, blogId } = req.body;
        if(!text){
            return res.status(400).json({message: 'Comment content is required (text)'})
        }

        const blog = await Blog.findById(blogId)
        if(!blog) {
            return res.status(400).json({message: 'Blog not found'})
        }

        const comment = new Comment({
            text,
            user: req.user.id,
            blog: blogId
        })

        await comment.save();
        res.status(201).json({message: 'Comment create successfully', comment })


    }catch(error){
        console.error('Error creating comment', error)
        res.status(500).json({message: 'Error while creating comment', error: error.message})
    }
}



// get all comment
const getCommentsByBlog = async(req, res) => {
    try{
        // get blog id from body
        // get comment

        const {blogId} = req.params;
        const comments = await Comment.find({ blog: blogId})
            .populate('user', 'name userName profilePicture email')
            .sort({createdAt: -1})

        return res.status(200).json({comments})
    }catch(error){
        console.error('Error fetching comments', error)
        return res.status(500).json({message: 'Error while fetching all comments', error: error.message})
    }
}


// delete comment
const deleteComment = async(req, res) => {
    try{
        // get comment id from params
        // find comment by findById
        // check if comment is available or not
        // chech if user or looged in user is same
        // remove comment

        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }
        

        const comment = await Comment.findById(id);

        if(!comment){
            return res.status(400).json({message: 'Comment not found'})
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(400).json({message: 'You are not authorized to delete this comment'})
        }

        await comment.deleteOne();
        return res.status(200).json({message: 'Comment deleted successfully'})



    }catch(error){
        console.error('Error in deleting message', error)
        return res.status(200).json({message: 'Error in deleting comment', error: error.message})
    }
}






module.exports = { createComment, getCommentsByBlog, deleteComment }