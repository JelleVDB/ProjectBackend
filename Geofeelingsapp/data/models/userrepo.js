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

    return {
        model: User,
        createUser: createUser
    };

})();

module.exports = UsersRepo;