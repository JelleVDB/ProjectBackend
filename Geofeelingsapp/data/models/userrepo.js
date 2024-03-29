/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');

UsersRepo = (function () {
    var User = require("./user.js");

    var createUser = function (user, next) {
        User.create(user, function (err) {
            if (err) {
                return next(err);
            }
            next(user);
        });
    };

    var updateUser = function (data, next) {
        console.log(data.id);
        var query = {_id: data.id};
        var update = {chat: data.chat, email: data.email};
        var options = {new: true};

        User.findOneAndUpdate(query, update, options, function (err, doc) {
            if (err) {
                console.log('got an error');
            }
            next(null, doc);
        });
    };

    var getAllUsers = function (next) {
        User.find({}, function (err, users) {
            if (err) throw err;

            next(null, users);
        });
    };

    var getUserByName = function (name, next) {
        User.find({username: name}, function (err, user) {
            if (err) throw err;

            next(null, user);
        });
    };

    var updateAdmin = function (user, next) {
        var query = {_id: user.id};
        var update = {admin: user.admin};
        var options = {new: true};

        User.findOneAndUpdate(query, update, options, function (err, doc) {
            if (err) {
                console.log('got an error');
            }
        });
    };

    var deleteUser = function (userId, next) {
        User.find({_id: userId}).remove().exec(function (err) {
            if (err) {
                next({error: err});
            }
            next(null);
        })
    }

    return {
        model: User,
        createUser: createUser,
        updateUser: updateUser,
        getAllUsers: getAllUsers,
        getUserByName: getUserByName,
        updateAdmin: updateAdmin,
        deleteUser: deleteUser
    };

})();

module.exports = UsersRepo;