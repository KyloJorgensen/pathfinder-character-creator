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
		User.find({username: username}, function(error, user) {
			if (error) {
				reject(error);
			} else {
				resolve(user);
			}
		})
	}).then(function(user) {
		if (user.length) {
			return new Promise(function(resolve, reject) { 
				user[0].validatePassword(password, function(error, isVaild) {
					if (error) {
						reject(error);
					} else {
						resolve(isVaild);
					}
				});
			}).then(function(isVaild) {
				if (isVaild) {
					var key = btoa(SECRET + ':' + username);
					res.setHeader('Set-Cookie', cookie.serialize('UserKey', key, {
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
};

module.exports = LoginController.prototype;


  