const express       = require('express');
const Trip          = require('../models/trips');
const Activities    = require('../models/activities');


const tripsController = {
   
    newTripPage: async (req, res) => {

        try {

            res.render('trips-ejs-files/newTripPage.ejs')

        } catch (err) {

            res.send(err);

        }

    },

    activityListPage: async (req, res) => {

        try {

            res.render('trips-ejs-files/newTripPage.ejs')

        } catch (err) {

            res.send(err);

        }

    },

    startTripPost: (req, res) => {

        res.redirect(`/trips/plan/${req.body.location}`)

    },

    userNewTripPage: async (req,res)=>{

            const allActivities = await Activities.find({city: req.params.city});
            res.render('trips-ejs-files/userTrip.ejs', {
                activities: allActivities,
                city: allActivities[0].city

            })
            
    },

    createTrip: async (req, res) => {

        if(req.session.logged){

            try {

                const activities = []
                
                if (Array.isArray(req.body.activity)) {

                    await Promise.all(req.body.activity.map(async (file) => {
                        activities.push(await Activities.findById(file))
                    }))

                } else {

                    activities.push(await Activities.findById(req.body.activity))

                }

                req.body.city = activities[0].city
                req.body.country = activities[0].country
                req.body.createdBy = req.session.user
                req.body.activity = activities        

                const newTrip = await Trip.create(req.body)
                res.redirect('/auth')

            } catch(err) {

                res.send(err)

            }
        
        } else {

            res.redirect('/')

        }
    },

    deleteTrip: async (req, res) => {

        try {

            const deletedTrip = await Trip.findByIdAndDelete({_id: req.params.id})
            const deletedActivities = await Activities.deleteMany({activity: req.params.id})
            res.redirect('/auth')
            
        } catch (error) {

            res.send(error)
            
        }

    }

}

module.exports = tripsController;