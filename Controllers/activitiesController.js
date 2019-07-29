const express = require('express');
const router = express.Router();
// const Trips = require('../models/trips.js');
const Activities = require('../models/activities');

const activitiesController = {
    addActivity: async (req, res) => {
        try {
            res.render('Trips-ejs-files/createActivity.ejs')
        }catch(err){
            res.send(err);
        }
    } ,
    // activityPost: async (req, res) => {
    //     try{

    //     } catch(err){
    //         res.send(err);
    //     }
    // }
}

module.exports = activitiesController;