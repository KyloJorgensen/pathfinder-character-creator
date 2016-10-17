'use strict';

var path = require('path'),
	cookie = require('cookie'),
	btoa = require('btoa'),
	SECRET = require('../../config/variables.express').SECRET,
	User = require('../user/user.model');

function LoginController() {};

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
		      		httpOnly: true,
		      		maxAge: 60 * 60 * 24 * 7 // 1 week 
		    	}));
				res.redirect('/');
			} else {
				res.setHeader('Set-Cookie', cookie.serialize('UserKey', null, {
		      		httpOnly: true,
		      		maxAge: 60 * 60 * 24 * 7 // 1 week 
		    	}));
				res.redirect('/#/login');
			}
		}).catch(function(error) {
			next(error);
		});
	}).catch(function(error) {
		next(error);
	});
};

module.exports = LoginController.prototype;


  