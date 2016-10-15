'use strict';

var cookie = require('cookie');

function LogoutController() {};

LogoutController.prototype.logout = function(req, res){
	res.setHeader('Set-Cookie', cookie.serialize('UserKey', null, {
     		httpOnly: true,
     		maxAge: 60 * 60 * 24 * 7 // 1 week 
   	}));
   	res.redirect('/');
};

module.exports = LogoutController.prototype;



