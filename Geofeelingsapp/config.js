/**
 * Created by jelle on 28/12/2015.
 */

"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
    //MONGODBURL: 'mongodb://JelleVDB:abc123@ds049624.mongolab.com:49624/geofeelings'
    MONGODBURL : process.env.MONGO_URI || 'mongodb://localhost/Geofeelings'
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        if (variable == 'PORT') { return 1337 };
        console.log('You must create an environment variable for ' + variable);
    }
    return process.env[variable]; //of bvb. process.env.WEB_PORT
};

module.exports = config;