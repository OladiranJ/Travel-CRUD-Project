// Requirements

const User          = require('../Models/Users')
const mongoose      = require('mongoose')
const bcrypt        = require('bcryptjs')



// -----------------------------------------------------------------------------------------


// Controller export

module.exports = {

    homepage: async (req, res) => {

        try {

            console.log('--------------------')
            console.log("this is the user's homepage")
            console.log('--------------------')
            res.render('Users-ejs-files/homepage.ejs')
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    profilePage: async (req, res) => {
        
        try {
            
            console.log('--------------------')
            console.log("this is the user's profile page")
            console.log('--------------------')
            res.render('Users-ejs-files/profilepage.ejs')
            
        } catch (error) {
            
            console.log(error)
            res.send(error)
            
        }
        
    },
    
    editProfile: async (req, res) => {
        
        try {
            
            console.log('--------------------')
            console.log("this is the edit profile page")
            console.log('--------------------')
            res.render('Users-ejs-files/editprofile.ejs')            
            
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
            res.render('Users-ejs-files/new.ejs')
            
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
            
        } catch (error) {
            
            console.log(error)
            res.send(error)

        }

    },

}