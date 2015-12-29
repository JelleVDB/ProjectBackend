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

router.post('/register', function(req, res){
    //TODO error check
    UsersRepo.createUser(req.body, function(next){
        //TODO redirect naar login (of autologin) naar homepage
        res.redirect('/');
    })
});

router.get('/accounts', function(req, res){

    // Uses Mongoose schema to run the search (empty conditions)
    var query = User.find({});
    query.exec(function(err, users){
        if(err)
            res.send(err);

        // If no errors are found, it responds with a JSON of all users
        res.json(users);
    });
});

module.exports = router;
