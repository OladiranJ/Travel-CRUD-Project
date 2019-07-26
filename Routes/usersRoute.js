// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../Controllers/usersController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)
router.get('/new', usersController.create)
router.get('/profile', usersController.profilePage)
router.get('/profile/edit', usersController.editProfile)




// -----------------------------------------------------------------------------------------


// Export router

module.exports = router