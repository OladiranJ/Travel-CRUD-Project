// Requirements

const mongoose      = require('mongoose')


// -----------------------------------------------------------------------------------------

// Model Schema

const userSchema    = new mongoose.Schema ({

    username:       {type: String, required: true, unique: true},
    password:       {type: String, required: true},
    email:          {type: String, required: true},
    bio:            {type: String, default: 'N/a'},
    profilePic:     {type: String, default: 'https://banner2.kisspng.com/20180425/xce/kisspng-computer-icons-user-profile-icon-design-5ae032c5b87a23.9366192115246425017556.jpg'}
    // trips:          [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Trips
    // }]

})


const User          = mongoose.model('User', userSchema)


// -----------------------------------------------------------------------------------------

// Model Export

module.exports = User