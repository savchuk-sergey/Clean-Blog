const bcrypt = require('bcrypt')
const User = require('../models/User')

global.usern = null

module.exports = (req, res) =>{
    const {username, password} = req.body

    User.findOne({username:username}, (error, user)=>{
        let validationErrors
        if(user){
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    validationErrors = 'Incorrect password'
                    req.flash('validationErrors', validationErrors)
                    req.flash('date', req.body)
                    res.redirect('/auth/login')
                }
            })
        } else{
            validationErrors = 'Incorrect username or password'
            req.flash('validationErrors', validationErrors)
            req.flash('date', req.body)
            res.redirect('/auth/login')
        }
        usern = req.body.username
    })

}
