'use strict';

var atob = require('atob');
var User = require('../api/user/user.model');
var SECRET = require('../config/variables.express').SECRET;

module.exports = function(req, res, next) {
    if (req.cookies.UserKey == 'null') {
    	var error = new Error('Bad Authentication');
    	error.name = 'AuthenticationError';
		next(error);
    } else {
        var _userKey = atob(req.cookies.UserKey);
        _userKey = _userKey.split(':');
        if (_userKey[0] == SECRET) {
            return new Promise(function(resolve, reject) {
                User.findOne({username: _userKey[1]}, function(error, user) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(user);
                    }
                });
            }).then(function(user) {
                req._userId = user._id;
                next();
            }).catch(function(error) {
                next(error);
            });            
        } else {
            var error = new Error('Bad Authentication');
            error.name = 'AuthenticationError';
            next(error);
        }
    }
};