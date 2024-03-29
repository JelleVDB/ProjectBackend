/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var path = require('path');
var EventRepo = require('../data/models/eventrepo.js');
var userRepo = require('../data/models/userrepo.js');

module.exports = function (app) {

    //Load root, show index file
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    //If the user is trying to load the map page, check if he is actually logged in
    app.get('/map', isLoggedIn, function (req, res) {
        //if he is logged in, return the user details
        EventRepo.getAllEvents(function (err, events) {
            if (err) {
                return res.json(err);
            }
            return res.json({user: req.user, events: events});
        });
    });

    app.get('/settings', isLoggedIn, function (req, res) {
        //if he is logged in, return the user details
        return res.json(req.user);
    });

    app.post('/settings', function (req, res) {
        console.log("komt hier");
        userRepo.updateUser(req.body, function (err, user) {
            if (err) {
                return res.json(err);
            }
            return res.json({});
        });
    });

    app.get('/admin', isAdmin, function (req, res) {
        //get all events

        EventRepo.getAllEvents(function (err, events) {
            userRepo.getAllUsers(function (err, users) {
                if (err)
                    return res.json(err);
                res.json({user: req.user, events: events, users: users, redirect: '/admin'});
            });
        });
    });

    app.post('/changeAdmin', isAdmin, function (req, res) {
        userRepo.updateAdmin(req.body, function (next) {
        });
    });

    app.post('/event', function (req, res) {
        EventRepo.createEvent(req.body, function (next) {
            res.json({redirect: '/map'});
        });
    });

    app.post('/deleteevent:id', function (req, res) {
        EventRepo.deleteEvent(req.params.id, function (next) {
            res.json({redirect: '/admin'});
        });
    });

    app.get('/events', function (req, res) {
        //get all events
        EventRepo.getAllEvents(function (err, events) {
            if (err) {
                return res.json(err);
            }
            res.json(events);
        });

    });

    app.get('/user:name', isLoggedIn, function (req, res) {
        console.log(req.params.name);
        userRepo.getUserByName(req.params.name, function (err, users) {
            if (err) {
                return res.json(err);
            }
            var user = users[0];
            EventRepo.getEventsByUser(user, function (err, events) {
                if (err) {
                    return res.json(err);
                }

                res.json({user: req.user, events: events, viewuser: user});
            });
        });
    });

    app.post('/deleteuser:id', function (req, res) {
        EventRepo.deleteEventsFromUser(req.params.id, function (next) {
            userRepo.deleteUser(req.params.id, function (next) {
                res.json({redirect: '/admin'});
            });
        });

    });
};


// User logged in
function isLoggedIn(req, res, next) {
    //Check if the user is authenticated (logged in)
    if (!req.isAuthenticated()) {
        //if not, redirect to login/register page
        return res.json({redirect: '/startpage'});
    } else {
        //if logged in, let the user continue
        next();
    }
}

// User is admin
function isAdmin(req, res, next) {
    //Check if the user is authenticated (logged in)
    if (!req.isAuthenticated()) {
        //if not, redirect back to the map page
        return res.json({redirect: '/map'});
    } else {
        //if logged in AND admin, let the admin continue
        if (req.user.admin) {
            next();
        } else {
            //if not admin, return back to the map page
            return res.json({redirect: '/map'});
        }

    }
}