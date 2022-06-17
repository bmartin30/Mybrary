if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
}

const { Router } = require('express')
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //where are the views coming from. This is a folder
app.set('layout', 'layouts/layout') //hookup express layouts, what are layouts going to be
app.use(expressLayout)
app.use(express.static('public')) //where are our files public to be. This is a folder

//Connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true 
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
