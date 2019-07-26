// Requirements

const User          = require('../Models/Users')
const mongoose      = require('mongoose')



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

            res.send(error)
            
        }

    },

}