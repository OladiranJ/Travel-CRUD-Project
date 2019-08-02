// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../controllers/usersController')
const tripsController   = require('../controllers/tripsController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)
router.get('/logout', usersController.userLogout)
router.get('/about', usersController.aboutPage)
router.get('/new', usersController.newUserPage)
router.get('/:id', usersController.profilePage)
router.get('/:id/edit', usersController.editProfile)
router.get('/:id/yourtrips', usersController.yourTripsPage)
router.put('/:id', usersController.edit)
router.delete('/:id', usersController.deleteUser)
router.post('/register', usersController.createUser)
router.post('/login', usersController.userLogin)


router.post('/create-trip', tripsController.createTrip)



// -----------------------------------------------------------------------------------------


// Export router

module.exports = router