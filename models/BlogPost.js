const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide title']
    },
    body: {
        type: String,
        required: [true, 'Please provide body']
    },
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        default: '/img/post-bg.jpg',
        required: [true, 'Please provide image']
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost