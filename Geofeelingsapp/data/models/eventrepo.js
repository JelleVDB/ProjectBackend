/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');

EventRepo = (function(){

    var Event = require("./event.js");

    var createEvent = function(event, next){
        Event.create(event, function(err){
            if(err){
                return next({error: err});
            }

            next(event);
        });
    },
        getAllEvents = function(next){
            Event.find({}).sort('author').exec(function(err, events){
                if(err){
                    console.log(err);
                    next({error: err}, null);
                }
                next(null, events);
            })
        },
        deleteEvent = function(eventId, next){
            Event.find({_id:eventId}).remove().exec(function(err){
                if(err){
                    console.log(err);
                    next({error: err});
                }
                next(null);
            })
        };

    return {
        model: Event,
        createEvent: createEvent,
        getAllEvents: getAllEvents,
        deleteEvent: deleteEvent
    }


})();

module.exports = EventRepo;