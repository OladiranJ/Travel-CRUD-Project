// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../Controllers/usersController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)
router.get('/new', usersController.newUserPage)
router.get('/:id', usersController.profilePage)
router.get('/:id/edit', usersController.editProfile)
router.post('/register', usersController.createUser)




// -----------------------------------------------------------------------------------------


// Export router

module.exports = router