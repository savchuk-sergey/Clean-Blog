const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        default: '/img/post-bg.jpg'
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost