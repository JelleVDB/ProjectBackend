/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var path = require('path');

module.exports = function(app, passport){

    //Load root, show index file
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../public/index.html'));
        //return res.json({ redirect : '/map' });
    });

    /* Register user */
    //When the user tries to data
    app.post('/register', function(req, res){
        //Attempt to authenticate user registration
        passport.authenticate('register', function(err, user){
            if(err){
                //If there are errors, return the error
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }

            //After registrating, log in the user
            req.logIn(user, function(err) {
                if (err) {
                    //If there are errors, return the error
                    return res.json(err);
                }

                //If the login is successful, redirect to the map page
                return res.json({ redirect : '/map' });
            });
        })(req, res);
    });

    /* Login user */
    //When the user is trying to log in
    app.post('/login', function(req, res){
        //Attempt to authenticate the login
        passport.authenticate('login', function(err, user){
            if(err){
                //If there are errors, return the error
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }

            //After authenticating, log in the user
            req.logIn(user, function(err) {
                if (err) {
                    //If there are errors, return the error
                    return res.json(err);
                }

                //If the login is successful, redirect to the map page
                return res.json({ redirect: '/map' });
            });
        })(req, res);
    });

    //If the user is trying to load the map page, check if he is actually logged in
    app.get('/map', isLoggedIn, function(req, res){
        //if he is logged in, return the user details
       return res.json(req.user);
    });

    //If the user wants to logout
    app.get('/logout', function(req, res){
        //logout the user
        req.logout();

        //redirect the user to the login/register page
        res.json({ redirect : '/account' });
    });
};


// User logged in
function isLoggedIn(req, res, next) {
    //Check if the user is authenticated (logged in)
    if (!req.isAuthenticated()) {
        //if not, redirect to login/register page
        return res.json({ redirect : '/account' });
    } else {
        //if logged in, let the user continue
        next();
    }
}