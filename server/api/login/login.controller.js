'use strict';

var path = require('path'),
	cookie = require('cookie'),
	btoa = require('btoa'),
	SECRET = require('../../config/variables.express').SECRET,
	User = require('../user/user.model');

function LoginController() {};

// Attaches UserKey if username and password are vaild.
LoginController.prototype.postLogin = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	return new Promise(function(resolve, reject) {
		User.findOne({username: username}, function(error, user) {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		})
	}).then(function(user) {
		if (user == null) {
			var error = new Error('Invaild Username.');
			error.name = 'LoginError';
			return next(error);
		}
		return new Promise(function(resolve, reject) { 
			user.validatePassword(password, function(error, isVaild) {
				if (error) {
					reject(error);
				} else {
					if (isVaild) {
						resolve(user._id);
					} else {
						resolve(false);
					}
				}
			});
		}).then(function(_id) {
			if (_id) {
				res.setHeader('Set-Cookie', cookie.serialize('UserKey', btoa(SECRET + ':' + _id), {
		      		httpOnly: false,
		      		maxAge: 60 * 60 * 24 * 7 // 1 week 
		    	}));
				res.status(200).json('');
			} else {
				var error = new Error('Invaild Password.');
				error.name = 'LoginError';
				return next(error);
			}
		}).catch(function(error) {
			next(error);
		});
	}).catch(function(error) {
		next(error);
	});
};

module.exports = LoginController.prototype;


  