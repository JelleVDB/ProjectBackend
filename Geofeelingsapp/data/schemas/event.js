/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mognoose');

var eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: Number
    },
    mood: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }
});

module.exports = EventSchema;