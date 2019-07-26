const express = require("express");
const router = express.Router();
const tripsController = require('../controllers/TripsController');

router.get('/', tripsController.showTripsIndex);

router.get('/new-trip', tripsController.newTripPage);
module.exports = router;