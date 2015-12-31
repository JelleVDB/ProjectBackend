/**
 * Created by Jelle on 31/12/2015.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../data/models/user');

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //signup
    passport.use('signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        console.log(username);
        process.nextTick(function () {
            if(!req.user){
                User.findOne({'username': username}, function(err, user){
                    if(err){
                        return done(err);
                    }

                    if(user){
                        return done(null, {error: 'Username already taken.'});
                    }else{
                        var newUser = new User();
                        newUser.generateHash(password, function(err, hash){
                            if(err){
                                throw err;
                            }

                            newUser.username = username;
                            newUser.password = hash;
                            newUser.email = req.body.email;
                            newUser.age = req.body.age;
                            newUser.gender = req.body.gender;
                            //TODO chat value
                            //newUser.chat = req.body.chat;
                            newUser.save(function(err){
                                if(err){
                                    throw err;
                                }

                                return done(null, newUser);
                            });
                        });
                    }
                });
            }
        });
    }));


    //login
    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done){
        process.nextTick(function(){
           User.findOne({'username': username}, function(err, user){
              if(err){
                  return done(err);
              }

              if(!user){
                  return done(null, {error: 'Oops! No user found.'});
              }else{
                  user.validPassword(password, function(err, isMatch){
                     if(err){
                         throw err;
                     }

                     if(isMatch){
                         return done(null, user);
                     }else{
                         return done(null, {error: 'Oops! Wrong password.'});
                     }
                  });
              }
           });
        });
    }));
};