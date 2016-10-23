'use strict';

var Feature = require('./feature.model');
var Character = require('../character/character.model');

function FeatureController() {};

// get Features queries: _characterId returns: Features
FeatureController.prototype.getFeatures = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feature.find({
			_userId: req._userId,
			_characterId: req.params._characterId
		}, function(error, features) {
			if (error) {
				reject(error);
			} else {
				resolve(features);
			}
		});
	}).then(function(features) {
		res.status(200).json(features);
	}).catch(function(error) {
		next(error);
	});
};

// get a Feature queries: _characterId and _featureId returns: Feature
FeatureController.prototype.getFeature = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feature.findOne({
			_userId: req._userId,
			_characterId: req.params._characterId,
			_id: req.params._featureId
		}, function(error, feature) {
			if (error) {
				reject(error);
			} else {
				resolve(feature);
			}
		});
	}).then(function(feature) {
		res.status(200).json(feature);
	}).catch(function(error) {
		next(error);
	});
};

// create Feature create: _characterId, name, and key_ability returns: new Feature
FeatureController.prototype.createFeature = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_userId: req._userId,
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Feature.create({
					_userId: req._userId,
					_characterId: character._id,
					name: req.body.name,
					key_ability: req.body.key_ability
				}, {
					new: true
				}, function(error, feature) {
					if (error) {
						reject(error);
					} else {
						resolve(feature);
					}
				});
			}
		});
	}).then(function(feature) {
		res.status(200).json(feature);
	}).catch(function(error) {
		next(error);
	});
};

// Update Feature queries: _characterId and _id update: name returns: new Feature 
FeatureController.prototype.updateFeature = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Feature.findOneAndUpdate({
			_userId: req._userId,
			_characterId: req.body._characterId,
			_id: req.body._id
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, feature) {
			if (error) {
				reject(error);
			} else {
				resolve(feature);
			}
		});
	}).then(function(feature) {
		res.status(200).json(feature);
	}).catch(function(error) {
		next(error);
	});
};

// delete Feature queries: _characterId and _id
FeatureController.prototype.deleteFeature = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feature.findOneAndRemove({
			_userId: req._userId,
			_id: req.body._id,
			_characterId: req.body._characterId
		}, function(error, feature) {
			if (error) {
				reject(error);
			} else {
				resolve(feature);
			}
		});
	}).then(function(feature) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = FeatureController.prototype;