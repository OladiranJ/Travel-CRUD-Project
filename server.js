// Requirements

const express           = require ('express')
const bodyParser        = require('body-parser')
const methodOverride    = require('method-override')
const logger            = require('morgan')
const app               = express()

require('./DB/db')

const usersRoute   = require('./Routes/usersRoute')
const tripsRoute   = require('./Routes/tripsRoute')


// -----------------------------------------------------------------------------------------

// Middleware

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use('/auth', usersRoute)
app.use('/trips', tripsRoute)



// -----------------------------------------------------------------------------------------

// Landing page

// app.get('/', (req, res) => {
 
//     res.render('welcomePage.ejs', {
//       message: req.session.message
//     })
//   })


// -----------------------------------------------------------------------------------------



// Listener

app.listen(3000, () => {
    console.log('server is running on port 3000')
})