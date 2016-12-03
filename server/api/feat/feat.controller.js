'use strict';

var Feat = require('./feat.model');
var Character = require('../character/character.model');

function FeatController() {};

// get Feats queries: _characterId returns: Feats
FeatController.prototype.getFeats = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feat.find({
			_userId: req._userId,
			_characterId: req.params._characterId
		}, function(error, feats) {
			if (error) {
				reject(error);
			} else {
				resolve(feats);
			}
		});
	}).then(function(feats) {
		res.status(200).json(feats);
	}).catch(function(error) {
		next(error);
	});
};

// get a Feat queries: _characterId and _featId returns: Feat
FeatController.prototype.getFeat = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feat.findOne({
			_userId: req._userId,
			_characterId: req.params._characterId,
			_id: req.params._featId
		}, function(error, feat) {
			if (error) {
				reject(error);
			} else {
				resolve(feat);
			}
		});
	}).then(function(feat) {
		res.status(200).json(feat);
	}).catch(function(error) {
		next(error);
	});
};

// create Feat create: _characterId, name returns: new Feat
FeatController.prototype.createFeat = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_userId: req._userId,
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Feat.create({
					_userId: req._userId,
					_characterId: character._id,
					name: req.body.name
				}, {
					new: true
				}, function(error, feat) {
					if (error) {
						reject(error);
					} else {
						resolve(feat);
					}
				});
			}
		});
	}).then(function(feat) {
		res.status(200).json(feat);
	}).catch(function(error) {
		next(error);
	});
};

// Update Feat queries: _characterId and _id update: name returns: new Feat 
FeatController.prototype.updateFeat = function(req, res, next) {
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
		Feat.findOneAndUpdate({
			_userId: req._userId,
			_characterId: req.body._characterId,
			_id: req.body._id
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, feat) {
			if (error) {
				reject(error);
			} else {
				resolve(feat);
			}
		});
	}).then(function(feat) {
		res.status(200).json(feat);
	}).catch(function(error) {
		next(error);
	});
};

// delete Feat queries: _characterId and _id
FeatController.prototype.deleteFeat = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feat.findOneAndRemove({
			_userId: req._userId,
			_id: req.body._id,
			_characterId: req.body._characterId
		}, function(error, feat) {
			if (error) {
				reject(error);
			} else {
				resolve(feat);
			}
		});
	}).then(function(feat) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = FeatController.prototype;