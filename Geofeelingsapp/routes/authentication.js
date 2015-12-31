/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var path = require('path');

module.exports = function(app, passport){

    //TODO moet homepage toegankelijk zijn zonder inloggen?
    //TODO index pagina niet in public (anders werkt login check niet)
    app.get('/', isLoggedIn, function(req, res){
        res.sendFile(path.join(__dirname, '../public/account/'));
    });

    /* Register user */
    app.get('/register', function(req, res){
        res.sendFile(path.join(__dirname, '../public/account/register.html'));
    });

    app.post('/register', function(req, res){
        passport.authenticate('signup', function(err, user){
            if(err){
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }
            //TODO autologin na registreren

        })(req, res);
    });
};


// User logged in
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        //TODO verander register naar login
        return res.redirect('/register');
    } else {
        next();
    }
}