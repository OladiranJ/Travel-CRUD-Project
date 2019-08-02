const mongoose = require('mongoose');



const tripsSchema = new mongoose.Schema({

    city:       {type: String, required: true},
    country:    String,
    activity:   [{

        type: mongoose.Schema.Types.ObjectId,
        ref:'Activities'
        
    }],
    description: String,
    date:       { type: Date, default: Date.now },
    createdBy:  {

        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }

})

const Trip = mongoose.model('Trip', tripsSchema);

module.exports = Trip;