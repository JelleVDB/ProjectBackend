/**
 * Created by Jelle on 29/12/2015.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

var User = require('../data/models/user.js');
var UsersRepo = require('../data/models/userrepo.js');

/* Register user */
router.get('/register', function(req, res){
    res.sendFile(path.join(__dirname, '../public/account/register.html'));
});

router.post('/register', function(req, res, next){
    //TODO error check
    UsersRepo.createUser(req.body, function(next){
        if(next.errors && next.name === 'ValidationError'){
            //TODO show validation error
            res.sendFile(path.join(__dirname, '../public/account/register.html'));
        }else if(next.errors){
            next(new Error(next.message));
        }else{
            //TODO redirect naar login (of autologin) naar homepage
            res.redirect('/');
        }


    })
});

module.exports = router;
