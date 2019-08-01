const express = require('express');
const router = express.Router();
// const Trips = require('../models/trips.js');
const Activities = require('../models/activities');

const activitiesController = {
    addActivity: async (req, res) => {
        try {
            const activitiesIndex = await Activities.find({});
            
            res.render('trips-ejs-files/createActivity.ejs', {
                activities: activitiesIndex
            });
        }catch(err){
            res.send(err);
        }
    } ,
    activityPost: async (req, res) => {
        try{
            const createdActivity = await Activities.create(req.body);
            res.redirect('/trips/add-activity');

        } catch(err){
            res.send(err);
        }
    },
    cityView: async (req, res) => {
        try{
            const cityList = await Activities.find( {city: req.params.city});
            console.log(cityList)
            res.render('trips-ejs-files/cityActPage.ejs',{
                activities: cityList,
                city: cityList[0].city
            });

        } catch (err){
            res.send(err);
        }
    },
    activityDetails: async (req, res) => {
        try{
            Activities.findById(req.params.id, (err, findActivity) => {
                res.render('trips-ejs-files/actDetailPage.ejs', {
                    activity: findActivity
                })
            }
            )

        }catch(err){
            res.send(err);
        }
    },
    deleteActivity: async (req, res) =>{
        try {
            Activities.findByIdAndRemove(req.params.id, () =>{
                res.redirect('/trips/add-activity');
            })

        }catch(err){
            res.send(err);

        }
    }
}

module.exports = activitiesController;