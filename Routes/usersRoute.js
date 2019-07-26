// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../Controllers/usersController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)
router.get('/profile', usersController.profilePage)




// -----------------------------------------------------------------------------------------


// Export router

module.exports = router