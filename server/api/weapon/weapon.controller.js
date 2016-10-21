'use strict';

var Weapon = require('./weapon.model');
var Character = require('../character/character.model');

function WeaponController() {};

// get Weapons queries: _characterId returns: Weapons
WeaponController.prototype.getWeapons = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Weapon.find({
			_characterId: req.params._characterId
		}, function(error, weapons) {
			if (error) {
				reject(error);
			} else {
				resolve(weapons);
			}
		});
	}).then(function(weapons) {
		res.status(200).json(weapons);
	}).catch(function(error) {
		next(error);
	});
};

// get a Weapon queries: _characterId and _weaponId returns: Weapon
WeaponController.prototype.getWeapon = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Weapon.findOne({
			_characterId: req.params._characterId,
			_id: req.params._weaponId
		}, function(error, weapon) {
			if (error) {
				reject(error);
			} else {
				resolve(weapon);
			}
		});
	}).then(function(weapon) {
		res.status(200).json(weapon);
	}).catch(function(error) {
		next(error);
	});
};

// create Weapon create: _characterId, name returns: new Weapon
WeaponController.prototype.createWeapon = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Weapon.create({
					_characterId: character._id,
					name: req.body.name
				}, {
					new: true
				}, function(error, weapon) {
					if (error) {
						reject(error);
					} else {
						resolve(weapon);
					}
				});
			}
		});
	}).then(function(weapon) {
		res.status(200).json(weapon);
	}).catch(function(error) {
		next(error);
	});
};

// Update Weapon queries: _characterId and _weaponId update: name, specialties returns: new Weapon 
WeaponController.prototype.updateWeapon = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
		if ('damage_type' in req.body) {
			changes.damage_type = req.body.damage_type;
		}
		if ('range' in req.body) {
			changes.range = req.body.range;
		}
		if ('crit' in req.body) {
			changes.crit = req.body.crit;
		}
		if ('attack_bonus' in req.body) {
			changes.attack_bonus = req.body.attack_bonus;
		}
		if ('damage_bonus' in req.body) {
			changes.damage_bonus = req.body.damage_bonus;
		}
		if ('damage_dice' in req.body) {
			changes.damage_dice = req.body.damage_dice;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Weapon.findOneAndUpdate({
			_characterId: req.body._characterId,
			_id: req.body._weaponId
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, weapon) {
			if (error) {
				reject(error);
			} else {
				resolve(weapon);
			}
		});
	}).then(function(weapon) {
		res.status(200).json(weapon);
	}).catch(function(error) {
		next(error);
	});
};

// delete Weapon queries: _characterId and _weaponId
WeaponController.prototype.deleteWeapon = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Weapon.findOneAndRemove({
			_id: req.body._weaponId,
			_characterId: req.body._characterId
		}, function(error, weapon) {
			if (error) {
				reject(error);
			} else {
				resolve(weapon);
			}
		});
	}).then(function(weapon) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = WeaponController.prototype;