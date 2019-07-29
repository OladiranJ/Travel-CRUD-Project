const express = require('express');
const router = express.Router();
const Trips = require('../models/trips.js');

const tripsController = {
    showTripsIndex: async (req, res) => {
        try {
            res.render('Trips-ejs-files/index.ejs');

        } catch(err){
            res.send(err);
        }
    },
    newTripPage: async (req, res) => {
        try {
            res.render('Trips-ejs-files/newTripPage.ejs')
        } catch (err){
            res.send(err);
        }
    },
    activityListPage: async (req, res) => {
        try {
            res.render('Trips-ejs-files/newTripPage.ejs')
        } catch (err){
        res.send(err);
        }
    }

}

module.exports = tripsController;