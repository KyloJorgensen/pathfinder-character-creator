'use strict';

var User = require('./user.model'),
	bcrypt = require('bcrypt');

function UserController() {};

UserController.prototype.getUser = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		User.find({}, function(error, users) {
			if (error) {
				reject(error);
			} else {
				resolve(users);
			}
		});
	}).then(function(users) {
		res.json(users)
	}).catch(function(error) {
		next(error);
	});
};

// creates new user from username, password, name
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
				var key = btoa(req.body.username + ':' + hash);
				res.setHeader('Set-Cookie', cookie.serialize('UserKey', key, {
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

module.exports = UserController.prototype;