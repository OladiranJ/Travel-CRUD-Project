const mongoose      = require('mongoose');

const activitiesSchema = new mongoose.Schema({

    activityName:     String,
    city:             {type: String, required: true},
    country:          {type: String, required: true},
    description:      String

})

const Activities = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;