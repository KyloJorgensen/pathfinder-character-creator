'use strict';

var Gear = require('./gear.model');
var Character = require('../character/character.model');

function GearController() {};

// get Gear queries: _characterId returns: Gear 
GearController.prototype.getAllGear = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Gear.find({
			_characterId: req.params._characterId
		}, function(error, gear) {
			if (error) {
				reject(error);
			} else {
				resolve(gear);
			}
		});
	}).then(function(gear) {
		res.status(200).json(gear);
	}).catch(function(error) {
		next(error);
	});
};

// get a Gear queries: _characterId and _gearId returns: Gear
GearController.prototype.getGear = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Gear.findOne({
			_characterId: req.params._characterId,
			_id: req.params._gearId
		}, function(error, gear) {
			if (error) {
				reject(error);
			} else {
				resolve(gear);
			}
		});
	}).then(function(gear) {
		res.status(200).json(gear);
	}).catch(function(error) {
		next(error);
	});
};

// create Gear create: _characterId, name returns: new Gear
GearController.prototype.createGear = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Gear.create({
					_characterId: character._id,
					name: req.body.name,
					key_ability: req.body.key_ability
				}, {
					new: true
				}, function(error, gear) {
					if (error) {
						reject(error);
					} else {
						resolve(gear);
					}
				});
			}
		});
	}).then(function(gear) {
		res.status(200).json(gear);
	}).catch(function(error) {
		next(error);
	});
};

// Update Gear queries: _characterId and _gearId update: name, specialties returns: new Gear 
GearController.prototype.updateGear = function(req, res, next) {
	return new Promise(function(resolve, reject) {
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
			return reject(error);
		}

		Gear.findOneAndUpdate({
			_characterId: req.body._characterId,
			_id: req.body._gearId
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, gear) {
			if (error) {
				reject(error);
			} else {
				resolve(gear);
			}
		});
	}).then(function(gear) {
		res.status(200).json(gear);
	}).catch(function(error) {
		next(error);
	});
};

// delete Gear queries: _characterId and _gearId
GearController.prototype.deleteGear = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Gear.findOneAndRemove({
			_id: req.body._gearId,
			_characterId: req.body._characterId
		}, function(error, gear) {
			if (error) {
				reject(error);
			} else {
				resolve(gear);
			}
		});
	}).then(function(gear) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = GearController.prototype;