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
            res.render('users-ejs-files/homepage.ejs', {
                id:         req.session.userId,
                username:   req.session.username,
                user:       foundUser,
                trips:      allTrips
            })
            
        } catch (error) {
            
            res.send(error)
            
        }
        
    },
    
    profilePage: async (req, res) => {
        
        try {

            const foundUser     = await User.findById(req.params.id)
            res.render('users-ejs-files/profilepage.ejs', {
                user: foundUser
            })
            
        } catch (error) {
            
            res.send(error)
            
        }
        
    },
    
    editProfile: async (req, res) => {
        
        try {
            
            const foundUser     = await User.findById(req.params.id)
            res.render('users-ejs-files/editprofile.ejs', {
                user: foundUser
            })            
            
        } catch (error) {
            
            res.send(error)
            
        }
        
    },
    
    newUserPage: async (req, res) => {
        
        try {
            
            res.render('users-ejs-files/new.ejs', {
                message:    req.session.message
            })
            
        } catch (error) {
            
            res.send(error)
            
        }
        
    },
    
    createUser: async (req, res) => {
              
        try {

            const foundUser = await User.findOne({username: req.body.username})

            if (foundUser) {

                req.session.message = 'Username already exists with another account'
                res.redirect('/auth/new')
                console.log('username exists')

            } else {

                const password = req.body.password
                const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                req.body.password = hashedPassword
    
                const createdUser = await User.create(req.body)
                
                req.session.userId = createdUser._id
                req.session.username = createdUser.username
                req.session.logged = true
                req.session.message = ''
                req.session.user = createdUser
                res.redirect('/auth')

            }


        } catch (error) {

            res.send(error)
            
        }

    },

    userLogin: async (req, res) => {

        req.session.tried = false

        try {

            const foundUser = await User.findOne({username: req.body.username})

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
            
            res.send(error)

        }

    },
    
    edit: async (req, res) => {

        try {

            const editUser = await User.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/auth/' + req.params.id)
            
        } catch (error) {

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

            req.session.destroy(() => {
                res.redirect('/')
            })
            
        } catch (error) {

            res.send(error)
            
        }

    }, 

    yourTripsPage: async (req, res) => {

        try {

            const foundUser = await User.findById(req.session.userId)
            const selectedTrip = await Trip.findById(req.params.id).populate('activity')

            res.render('users-ejs-files/yourtrips.ejs', {
                id:     req.session.userId,
                user:   foundUser,
                trip: selectedTrip,
                city:   selectedTrip.city
            })
            
        } catch (error) {

            res.send(error)
            
        }

    },

    aboutPage: async (req, res) => {

        try {
            
            res.render('users-ejs-files/about.ejs')
            
        } catch (error) {
            
            res.send(error)
            
        }
    }

}