/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var path = require('path');

var router = express.Router();

module.exports = function(app, passport){

    //TODO error handling (username taken, wrong password)

    //TODO moet homepage toegankelijk zijn zonder inloggen?
    //TODO index pagina niet in public (anders werkt login check niet)
    app.get('/', isLoggedIn, function(req, res){
        res.sendFile(path.join(__dirname, '../public/map.html'));
    });

    /* Register user */
    app.get('/register', function(req, res){
        res.sendFile(path.join(__dirname, '../public/register-beta.html'));
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
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }
                //TODO redirect werkt niet
                return res.redirect('/');
            });
        })(req, res);
    });

    /* Login user */
    app.get('/login', function(req, res){
        res.sendFile(path.join(__dirname, '../public/login-beta.html'));
    });

    app.post('/login', function(req, res){
        passport.authenticate('login', function(err, user){
            if(err){
                return res.json(err);
            }

            if(user.error){
                return res.json({error: user.error});
            }
            //TODO autologin na registreren
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(err);
                }
                //TODO redirect werkt niet
                return res.redirect('/');
            });
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