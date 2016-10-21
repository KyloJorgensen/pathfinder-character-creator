'use strict';

var atob = require('atob'),
    User = require('../api/user/user.model'),
    SECRET = require('../config/variables.express').SECRET;

// Takes Looks for UserKey Cookie and returns if successful _userId to endpoint.
module.exports = function(req, res, next) {
    if (!'authentication' in req.headers) {
        var error = new Error('Missing Authentication');
        error.name = 'AuthenticationError';
        next(error);
    }
    var authentication = req.headers['authentication'].split('=');
    var _userKey = atob(authentication[1]);
    _userKey = _userKey.split(':');
    if (_userKey[0] == SECRET) {
        return new Promise(function(resolve, reject) {
            User.findOne({_id: _userKey[1]}, function(error, user) {
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
};