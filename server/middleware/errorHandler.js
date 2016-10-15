'use strict';

module.exports = function(app) {
	app.use(function(error, req, res, next) {
		if (error) {
			next(error);
		} else {
			res.status(500).json('missing error');
		}
	});
	app.use(function(error, req, res, next) {
		if (res.headerSent) {
			return next(error);
		}

		if (error.name == 'AuthenticationError') {
			res.status(401).end();
		} 

		res.status(500);
		console.log(error);
		if (error) {
			return res.json(error);
		} else {
			return res.json('missing message');
		}

		next(error);
	});
	app.use(function(error, req, res, next) {
		console.log('CRITICAL ERROR: ', error);
	})
};