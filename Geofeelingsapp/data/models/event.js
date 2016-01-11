/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');
var EventSchema = require("../schemas/event")

var Event = mongoose.model('Event', EventSchema, "events");

module.exports = Event;