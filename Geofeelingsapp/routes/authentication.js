/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var path = require('path');

module.exports = function(app, passport){

    //TODO error handling (foutieve email etc)

    //TODO moet homepage toegankelijk zijn zonder inloggen?
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    /* Register user */
    app.post('/register', function(req, res){
        passport.authenticate('register', function(err, user){
            if(err){
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }
                //TODO redirect werkt niet
                return res.json({ redirect : '/' });
            });
        })(req, res);
    });

    /* Login user */
    app.post('/login', function(req, res){
        passport.authenticate('login', function(err, user){
            if(err){
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }

            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }
                //TODO redirect werkt niet
                return res.json({ redirect: '/' });
            });
        })(req, res);
    });
};


// User logged in
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    } else {
        next();
    }
}