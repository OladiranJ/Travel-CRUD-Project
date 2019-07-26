const mongoose = require('mongoose');
const tripsSchema = new mongoose.Schema({
    city: {type: String, required: true},
    date: { type: Date, default: Date.now },

})

const Trips = mongoose.model('Trips', tripsSchema);

module.exports = Trips;