/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId, ref:'User'
    },
    message: {
        type: String
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