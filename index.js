const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')

const app = new express()
app.set('view engine', 'ejs')
mongoose.connect('mongodb+srv://l4mag:9621931ss@cluster0-06dow.mongodb.net/my_database', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

let PORT = process.env.PORT
if(PORT == null || PORT == ""){
    PORT = 4000
}
global.loggedIn = null
global.username = null

const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleWare = require('./middleware/authMiddleware')
const redirectIfAuthMiddleWare = require('./middleware/redirectIfAuthMiddleware')

const newPostContoller = require('./contollers/newPost')
const aboutContoller = require('./contollers/about')
const contactContoller = require('./contollers/contact')
const getPostContoller = require('./contollers/getPost')
const storePostContoller = require('./contollers/storePost')
const homeContoller = require('./contollers/home')
const loginUserController = require('./contollers/loginUser')
const newUserController = require('./contollers/newUser')
const storeUserController = require('./contollers/storeUser')
const loginController = require('./contollers/login')
const logoutController = require('./contollers/logout')

app.use(flash())
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*", (req, res, next) =>{
    loggedIn = req.session.userId
    next()
})
app.use("*", (req, res, next) =>{
    loggedIn = req.session.userId
    next()
})

app.listen(PORT, ()=>{
    console.log('App listening on port ' + PORT)
})

app.get('/', homeContoller)
app.get('/post/:id', getPostContoller)
app.get('/posts/new', authMiddleWare, newPostContoller)
app.get('/about', aboutContoller)
app.get('/create', (req, res) =>{
    res.redirect('/posts/new')
})
app.get('/contact', contactContoller)
app.get('/auth/register', newUserController)
app.get('/auth/login', loginController)
app.get('/auth/register', redirectIfAuthMiddleWare, newUserController) 
app.get('/auth/login', redirectIfAuthMiddleWare, loginController) 
app.get('/auth/logout', logoutController)
app.post('/users/register', redirectIfAuthMiddleWare, storeUserController)
app.post('/users/login',redirectIfAuthMiddleWare, loginUserController)
app.post('/posts/store', authMiddleWare, storePostContoller)
app.post('/users/register', storeUserController)
app.post('/users/login', loginUserController)

app.use((req, res) => res.render('notfound'))


