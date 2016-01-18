/**
 * Created by jelle on 28/12/2015.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    chat: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', function (next) {
    if (!this.timestamp) {
        this.timestamp = new Date();
    }
    if (!this.chat) {
        this.chat = true;
    }
    if (!this.admin) {
        this.admin = false;
    }

    next();
});

module.exports = UserSchema;