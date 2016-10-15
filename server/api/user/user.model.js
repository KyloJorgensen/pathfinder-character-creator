'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

userSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

module.exports = mongoose.model('User', userSchema);