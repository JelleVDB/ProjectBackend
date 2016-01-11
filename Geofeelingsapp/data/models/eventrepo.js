/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');

EventRepo = (function(){

    var Event = require("./event.js");

    var createEvent = function(event, next){
        Event.create(event, function(err){
            if(err){
                return next(err);
            }

            next(event);
        });
    },
        getAllEvents = function(next){
            Event.find({}).sort('message').exec(function(err, events){
                if(err){
                    console.log(err);
                    next(err, null);
                }
                next(null, events);
            })
        };

    return {
        model: Event,
        createEvent: createEvent,
        getAllEvents: getAllEvents
    }


})();

module.exports = EventRepo;