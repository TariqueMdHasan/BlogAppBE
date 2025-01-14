const Blog = require('../Models/BlogModel.js')
const path = require('path')

// create Blog
// get all blog
// get blog by id
// update blog
// delete blog
// get all blog by user id (later)


// create Blog
const createBlog = async(req, res) => {
    try{
        // take title content from req body
        // extract userId from token (req.user.id)
        // save everything in const
        // save the file

        const {title, content} = req.body;
        const userId = req.user.id;

        const newBlog = new Blog({
            title,
            content,
            author: userId,
            image: req.file? `uploads/${req.file.filename}`: undefined,
        })

        const savedBlog = await newBlog.save();
        res.status(200).json({message: 'Blog created sucessfully', blog: savedBlog})
        

    }catch(error){
        console.error('Error creating blog', error)
        return res.status(500).json({message: 'Error creating blog', error: error.message})
    }
}


// get all blog
const getAllBlogs = async(req, res)=> {
    try{
        const blogs = await Blog.find().populate('author', 'name userName email profilePicture');
        res.status(200).json(blogs)
    }catch(error){
        console.log('Error fetching blog', error)
        return res.status(500).json({message: 'Error fetching blogs', error: error.message})
    }
}


// get blog by id
const fetchBlogById = async(req, res) => {
    try{
        // get id of blog
        // get blog by that id 
        // check if blog exist or not
        // respond blog in json

        const {id} = req.params;
        const blog = await Blog.findById(id).populate('author', 'name userName email profilePicture');
        if(!blog){
            return res.status(400).json({message: 'Blog not found'})
        }
        res.status(200).json(blog)

    }catch(error){
        console.error('Error in fetching blog', error)
        return res.status(500).json({message: 'Error in fetching blog', error: error.message})
    }
}




// update a blog by id
const updateBlog = async(req, res) => {
    try{
        // take blog id from params
        // cosnt title, content from body
        // check if blog by that id exist or not
        // chech if author of that id and logged in user are same or not
        // update
        // save

        const {id} = req.params;
        const {title, content} = req.body;

        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(400).json({message: 'Blog not exist'})
        }

        if(blog.author.toString() !== req.user.id){
            return res.status(400).json({message: 'You are Unauthorized to update this blog'})
        }

        blog.title = title || blog.title;
        blog.content = content || blog.conntent;
        blog.updateBlog = Date.now();
        if (req.fiel){
            blog.image= `uploads/${req.file.filename}`
        }

        const updatedBlog = await blog.save();
        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog})

    }catch(error){
        console.log('Error updating blog', error)
        return res.status(500).json({message: 'Error updating blog', error: error.message})
    }

}



// delete blog by id 
const deleteBlog = async(req, res) => {
    try{
        // get blog id from params
        // check if blog exist
        // check if author of blog and loggedin user are same
        // delete
        const {id} = req.params;

        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(400).json({message: 'Blog not found'})
        }

        if(blog.author.toString() !== req.user.id) {
            return res.status(400).json({message: 'You are not unauthorized to delete this blog'})
        }

        await blog.deleteOne();
        res.status(200).json({message: 'blog deleted successfully'})




    }catch(error){
        console.error('Error in deleting blog', error)
        return res.status(500).json({message: 'Error in deleting message', error: error.message})
    }
}


// get blog belongs to the user

const getUserBlog = async(req, res) => {
    try{
        // take id of user
        // find blog from that user
        // return blog

        const userId = req.user.id;
        const blogs = await Blog.find({ author: userId}).populate('author', 'name email userName profilePicture')

        if(!blogs || blogs.length === 0){
            return res.status(400).json({message: 'No blog found for this user'})
        }

        res.status(200).json({
            message: 'Blogs fetched sucessfully',
            blogs
        })


    }catch(error){
        console.error('Error fetching user blog:', error)
        res.status(500).json({message: 'Error fetching user blogs', error: error.message})
    }
}





module.exports = { createBlog, getAllBlogs, updateBlog, fetchBlogById, deleteBlog, getUserBlog }