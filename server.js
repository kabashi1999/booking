if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://user:<9192631770>@cluster0-nfsjz.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true,useNewUrlParser:true})
const db = mongoose.connection
db.on('error', erroe => console.error('error'))
db.once('open',()=> console.log('connected to mongoose'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)

app.listen(process.env.PORT || 3000)