const express = require('express');
const router = express.Router();
const Trips = require('../Models/Trips');
const Activities = require('../models/activities');


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
    },
    startTripPost: (req, res) => {
        res.redirect(`/trips/plan/${req.body.location}`)
    },
    userNewTripPage: async (req,res)=>{
            const allActivities = await Activities.find({city: req.params.city});
            console.log(allActivities);
            res.render('Trips-ejs-files/userTrip.ejs', {
                activities: allActivities,
                city: allActivities[0].city

            })
            // pass in all the acitivites and the city to the ejs page
        }
}

module.exports = tripsController;