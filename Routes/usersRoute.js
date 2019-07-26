// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../Controllers/usersController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)




// -----------------------------------------------------------------------------------------


// Export router

module.exports = router