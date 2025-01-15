const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Comment', commentSchema)