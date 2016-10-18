'use strict';

var User = require('./user.model'),
	bcrypt = require('bcryptjs'),
	btoa = require('btoa'),
	cookie = require('cookie'),
    SECRET = require('../../config/variables.express').SECRET;

function UserController() {};

// creates new user from username, password, and name. Attaches UserKey cookie.
UserController.prototype.createUser = function(req, res, next) {
    // generates the salt for bcrypt to encrypt the passwordz
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // generates encrypted password
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            return new Promise(function(resolve, reject) {
                // creates user useing username, encrypted password (hash), name
                User.create({
                    username: req.body.username,
                    password: hash,
                    name: req.body.name,
                }, function(error, user) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(user);
                    }
                })
            }).then(function(user) {
				res.setHeader('Set-Cookie', cookie.serialize('UserKey', btoa(SECRET + ':' + user._id), {
				   	httpOnly: true,
				   	maxAge: 60 * 60 * 24 * 7 // 1 week 
				}));
				res.redirect('/');
            }).catch(function(error) {
                next(error);
            });
        });
    });
};

// one get returns users name
UserController.prototype.getUserName = function(req, res, next) {
    return new Promise(function(resolve, reject) {
        User.findOne({
            _id: req._userId
        }, function(error, user) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    }).then(function(user) {
        res.status(200).json(user.name);
    }).catch(function(error) {
        next(error);
    });
};

module.exports = UserController.prototype;