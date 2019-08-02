// Requirements

const mongoose      = require('mongoose')


// -----------------------------------------------------------------------------------------

// Model Schema

const userSchema    = new mongoose.Schema ({

    username:       {type: String, required: true, unique: true},
    password:       {type: String, required: true},
    email:          {type: String, required: true},
    bio:            {type: String, default: 'N/a'},
    profilePic:     {type: String, default: '/images/profPicBackground-01 (1).png'}
   
})


const User          = mongoose.model('User', userSchema)


// -----------------------------------------------------------------------------------------

// Model Export

module.exports = User