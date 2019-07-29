const mongoose = require('mongoose');
const tripsSchema = new mongoose.Schema({
    city: {type: String, required: true},
    country: String,
    activity: String,
    description: String,
    date: { type: Date, default: Date.now },

})

const Trips = mongoose.model('Trips', tripsSchema);

module.exports = Trips;