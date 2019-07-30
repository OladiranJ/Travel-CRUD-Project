const express = require('express');
const Trip = require('../Models/Trips');
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
            // console.log(allActivities);
            res.render('Trips-ejs-files/userTrip.ejs', {
                activities: allActivities,
                city: allActivities[0].city

            })
            // pass in all the acitivites and the city to the ejs page
    },
    createTrip: async (req, res) => {
        if(req.session.logged){
            try {
            // console.log(req.body.activity)
            const activities = []
            // check if its an array
            // if it is then you have to find all the activities *problem is async
            if(Array.isArray(req.body.activity)) {
                await Promise.all(req.body.activity.map(async (file) => {
                    activities.push(await Activities.findById(file))
                  }))
            }
            
            const createdTrip = await Trip.create({
                city: 'burbank',
                country: 'usa',
                description: 'this is a new trip',
                createdBy: req.session.user
            })


            if(activities.length === 0) {
                const findActivities = await Activities.findById(req.body.activity)
                createdTrip.activity.push(findActivities)
            } else {
                createdTrip.activity.push(...activities)
            }
            
            await createdTrip.save()
            console.log(createdTrip)
            
            // console.log("================StartfindActivities=1================")
            // console.log(findActivities)
            // console.log("================ENDfindActivities=1=================")
            } catch(err) {
            console.log(err)
            }
        
            // find the activity. req.body
            // create the trip
            // push the activity to the trip.activity
            // add the user to the createdBuy in the trip.createdBy
            // then save the trip
            // console.log(Array.isArray(req.body.activity))
            // console.log(req.body.activity)
        } else {
            res.redirect('/')
        }
    }
}

module.exports = tripsController;