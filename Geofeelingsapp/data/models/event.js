/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mognoose');
var eventSchema = require("../schemas/event")


module.exports = mongoose.model('Event', eventSchema);

var Event = mongoose.model('Event', eventSchema, "events");

module.exports = Event;