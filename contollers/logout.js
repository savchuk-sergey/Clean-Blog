module.exports = (req, res) =>{
    req.session.destroy(() =>{
        usern = null
        res.redirect('/')
    })
}