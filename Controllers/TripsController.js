const express = require('express');
const router = express.Router();
const Trips = require('../models/trips.js');

const tripsController = {
    showTripsIndex: async (req, res) => {
        try {
            console.log('-------------');
            console.log('trips route');
            console.log('-------------');
            res.render('Trips-ejs-files/index.ejs');

        } catch(err){
            res.send(err);
        }
    }
}

module.exports = tripsController;