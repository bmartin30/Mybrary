if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
}

const { Router } = require('express')
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')

//routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //where are the views coming from. This is a folder
app.set('layout', 'layouts/layout') //hookup express layouts, what are layouts going to be
app.use(expressLayout)
app.use(express.static('public')) //where are our files public to be. This is a folder
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//Connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true 
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter) //root route
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)
