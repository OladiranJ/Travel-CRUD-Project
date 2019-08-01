// Requirements

const express           = require ('express')
const bodyParser        = require('body-parser')
const methodOverride    = require('method-override')
const session           = require('express-session')
const logger            = require('morgan')
const app               = express()

require('dotenv').config()
const PORT              = process.env.PORT
require('./DB/db')

const usersRoute   = require('./Routes/usersRoute')
const tripsRoute   = require('./Routes/tripsRoute')



// -----------------------------------------------------------------------------------------

// Middleware

app.use(session({
    secret: 'THIS IS A RANDOM SECRET STRING',
    resave: false,
    saveUninitialized: false
  }))
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.static('public'))

app.use('/auth', usersRoute)
app.use('/trips', tripsRoute)



// -----------------------------------------------------------------------------------------

// Landing page

app.get('/', (req, res) => {
 
    res.render('Views/welcomePage.ejs', {
      message: req.session.message
    })
  });


// -----------------------------------------------------------------------------------------



// Listener

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})