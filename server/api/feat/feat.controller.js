'use strict';

var Feat = require('./feat.model');
var Character = require('../character/character.model');

function FeatController() {};

// get Feats queries: _characterId returns: Feats
FeatController.prototype.getFeats = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feat.find({
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
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Feat.create({
					_characterId: character._id,
					name: req.body.name,
					key_ability: req.body.key_ability
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

// Update Feat queries: _characterId and _featId update: name, specialties returns: new Feat 
FeatController.prototype.updateFeat = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
		if ('specialties' in req.body) {
			changes.specialties = req.body.specialties;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Feat.findOneAndUpdate({
			_characterId: req.body._characterId,
			_id: req.body._featId
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

// delete Feat queries: _characterId and _featId
FeatController.prototype.deleteFeat = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Feat.findOneAndRemove({
			_id: req.body._featId,
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