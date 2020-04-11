const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = async (req,res)=>{    
    const blogposts = await BlogPost.find({})     
    console.log(req.session)
    res.render('index',{ 
        blogposts
    }); 
}