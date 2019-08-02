// Requirements

const User          = require('../models/users')
const Trip          = require('../models/trips')
const mongoose      = require('mongoose')
const bcrypt        = require('bcryptjs')



// -----------------------------------------------------------------------------------------


// Controller export

module.exports = {

    homepage: async (req, res) => {

        try {

            const foundUser     = await User.findById(req.session.userId)
            const allTrips      = await Trip.find({createdBy: req.session.userId}).populate("activity")
            console.log('--------------------')
            console.log("this is the user's homepage")
            console.log('--------------------')
            res.render('users-ejs-files/homepage.ejs', {
                id:         req.session.userId,
                username:   req.session.username,
                user:       foundUser,
                trips:      allTrips
            })
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    profilePage: async (req, res) => {
        
        try {

            const foundUser     = await User.findById(req.params.id)
            console.log('--------------------')
            console.log("this is the user's profile page")
            console.log('--------------------')
            res.render('users-ejs-files/profilepage.ejs', {
                user: foundUser
            })
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    editProfile: async (req, res) => {
        
        try {
            
            const foundUser     = await User.findById(req.params.id)
            console.log('--------------------')
            console.log("this is the edit profile page")
            console.log('--------------------')
            res.render('users-ejs-files/editprofile.ejs', {
                user: foundUser
            })            
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    newUserPage: async (req, res) => {
        
        try {
            
            console.log('--------------------')
            console.log("this is the create user page")
            console.log('--------------------')
            res.render('users-ejs-files/new.ejs')
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    createUser: async (req, res) => {
              
        try {

            const password = req.body.password
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            console.log('--------------------')
            console.log(hashedPassword)
            console.log('--------------------')
            req.body.password = hashedPassword

            const createdUser = await User.create(req.body)
            console.log('--------------------')
            console.log(createdUser, 'post route/created user')
            console.log('--------------------')
            
            req.session.userId = createdUser._id
            req.session.username = createdUser.username
            req.session.logged = true
            req.session.user = createdUser
            res.redirect('/auth') // redirect to homepage for now. eventually change to main login.

        } catch (error) {

            console.log(error)
            res.send(error)
            
        }

    },

    userLogin: async (req, res) => {

        req.session.tried = false

        try {

            const foundUser = await User.findOne({username: req.body.username})
            console.log(foundUser, ' foundUser')

            if (foundUser) {

                if (bcrypt.compareSync(req.body.password, foundUser.password)) {

                    req.session.userId      = foundUser._id
                    req.session.username    = foundUser.username
                    req.session.logged      = true
                    req.session.message     = ''
                    req.session.user        = foundUser
                    res.redirect('/auth')

                } else {

                    req.session.message = 'Username or Password Incorrect'
                    res.redirect('/')

                }

            } else {

                req.session.message = 'Username or Password Incorrect'
                res.redirect('/')

            }
            
        } catch (error) {
            
            console.log(error)
            res.send(error)

        }

    },
    
    edit: async (req, res) => {

        try {

            const editUser = await User.findByIdAndUpdate(req.params.id, req.body)
            console.log('--------------------')
            console.log(editUser)
            console.log('--------------------')
            res.redirect('/auth/' + req.params.id)
            
        } catch (error) {

            console.log(error)
            res.send(error)
            
        }

    },

    userLogout: async (req, res) => {

        try {

            req.session.destroy(() => {
                res.redirect('/')
            })
            
        } catch (error) {

            res.send(error)
            
        }

    },

    deleteUser: async (req, res) => {

        try {

            const deletedUser = await User.findOneAndDelete({_id: req.params.id})
            const deleteTrips = await Trip.deleteMany({createdBy:req.params.id})
            console.log('--------------------')
            console.log(deletedUser, '<--- this user was deleted')
            console.log('--------------------')
            // *After models are finished be sure to include trips in this delete control just like blog*
            req.session.destroy(() => {
                res.redirect('/')
            })
            
        } catch (error) {

            console.log(error)
            res.send(error)
            
        }

    }, 

    yourTripsPage: async (req, res) => {

        try {

            const foundUser = await User.findById(req.session.userId)
            const selectedTrip = await Trip.findById(req.params.id).populate('activity')
            // console.log('--------------------')
            // console.log("this is the user's trip page")
            // console.log('--------------------')
            // console.log(allTrips, "<--- this is all the trips")
            // console.log('--------------------')
            res.render('users-ejs-files/yourtrips.ejs', {
                id:     req.session.userId,
                user:   foundUser,
                trip: selectedTrip,
                city:   selectedTrip.city
            })
            
        } catch (error) {

            console.log(error)
            res.send(error)
            
        }

    },

    aboutPage: async (req, res) => {

        try {
            
            console.log('--------------------')
            console.log("this is the create user page")
            console.log('--------------------')
            res.render('users-ejs-files/about.ejs')
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
    }

}