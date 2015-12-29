/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');
var userSchema = require("../schemas/user");
var bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(8);

userSchema.methods.generateHash = function(password, cb){
    bcrypt.hash(password, salt, function(err, hash) {
        if(err){
            return cb(err);
        }
        return cb(err, hash);
    });
};

userSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
       if(err){
           return cb(err);
       }
        return cb(null, isMatch);

    });
};

var User = mongoose.model('User', userSchema, "users");

module.exports = User;