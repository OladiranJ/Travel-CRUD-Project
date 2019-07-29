const express = require("express");
const router = express.Router();
const tripsController = require('../controllers/TripsController');
const activitiesController =require('../controllers/activitiesController');

// Trips
router.get('/', tripsController.showTripsIndex);
router.get('/new-trip', tripsController.newTripPage);

// Activities
router.get('/activity-list', tripsController.activityListPage)
router.get('/add-activity', activitiesController.addActivity)
// router.post('/', activitiesController.activityPost);

module.exports = router;