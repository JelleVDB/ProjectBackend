/**
 * Created by Jelle on 31/12/2015.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../data/models/user');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    //Strategy used to register
    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            if (!req.user) {
                //Look if the username already exists
                User.findOne({'username': username}, function (err, user) {
                    //if a error happened during the search, return it
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        //If the username is taken, return the error
                        return done(null, {error: 'Username already taken.'});
                    } else {
                        //If it isn't taken, start making a new user
                        var newUser = new User();
                        //Hash the given password for security
                        newUser.generateHash(password, function (err, hash) {
                            //if a error happened during hashing, return it
                            if (err) {
                                throw err;
                            }

                            //fill in the rest of the users data
                            newUser.username = username;
                            newUser.password = hash;
                            newUser.email = req.body.email;
                            newUser.age = req.body.age;
                            newUser.gender = req.body.gender;

                            //Save the user to the database
                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }

                                //return the just made user
                                return done(null, newUser);
                            });
                        });
                    }
                });
            }
        });
    }));


    //Strategy used to login
    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            //Check if the given username is in the database
            User.findOne({'username': username}, function (err, user) {
                //if a error happened during the search, return it
                if (err) {
                    return done(err);
                }

                //If no user is found
                if (!user) {
                    //Return the user not found error
                    return done(null, {error: 'Oops! No user found.'});
                } else {
                    //If the username is found, check if the password matches
                    user.validPassword(password, function (err, isMatch) {
                        //if a error happened during password check, return it
                        if (err) {
                            throw err;
                        }

                        //if the password is a match
                        if (isMatch) {
                            //return the logged in user
                            return done(null, user);
                        } else {
                            //User exists, but wrong password
                            //return the wrong password error
                            return done(null, {error: 'Oops! Wrong password.'});
                        }
                    });
                }
            });
        });
    }));
};