const express = require("express");
const router = express.Router();
const tripsController = require('../controllers/TripsController');

router.get('/', tripsController.showTripsIndex);
module.exports = router;