const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            defalut: 'Uploads/pf.jpg',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Blog', blogSchema)