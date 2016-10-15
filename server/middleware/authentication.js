'use strict';

var cookie = require('cookie');

module.exports = function(req, res, next) {
    console.log('cookies: ', req.cookies.UserKey);
    if (req.cookies.UserKey == 'null') {
    	console.log('error');
    	var error = new Error('Bad Authentication');
    	error.name = 'AuthenticationError';
		next(error);
    } else {
    	console.log('success');
    	next();
    }
};