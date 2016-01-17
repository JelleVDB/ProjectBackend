/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');

UsersRepo = (function(){
    var User = require("./user.js");

    var createUser = function(user, next){
        User.create(user, function(err){
            if(err) {
                return next(err);
            }
            next(user);
        });
    };

    var updateUser = function(data, next){
        console.log(data.id);
        var query = { _id: data.id};
        var update = {chat: data.chat, email: data.email};
        var options = {new: true};

        User.findOneAndUpdate(query, update, options, function (err, doc){
            if (err) {
                console.log('got an error');
            }
        });
    };

    var getAllUsers = function (cb) {
        User.find({}, function(err, users) {
            if (err) throw err;

            console.log(users);
        });
    };

    return {
        model: User,
        createUser: createUser,
        updateUser: updateUser,
        getAllUsers: getAllUsers
    };

})();

module.exports = UsersRepo;