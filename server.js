// Requirements

const express           = require ('express')
const bodyParser        = require('body-parser')
const methodOverride    = require('method-override')
const app               = express()

require('./DB/db')



// -----------------------------------------------------------------------------------------

// Middleware

app.use(express.json())
app.use(express.urlencoded())
app.use(methodOverride('_method'))



// -----------------------------------------------------------------------------------------

// Listener

app.listen(3000, () => {
    console.log('server is running on port 3000')
})