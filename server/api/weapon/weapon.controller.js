'use strict';

var Acitem = require('./acitem.model');
var Character = require('../character/character.model');

function WeaponController() {};

// get Acitems queries: _characterId returns: Acitems
WeaponController.prototype.getAcitems = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.find({
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

// get a Acitem queries: _characterId and _weaponId returns: Acitem
WeaponController.prototype.getAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.findOne({
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

// create Acitem create: _characterId, name returns: new Acitem
WeaponController.prototype.createAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Acitem.create({
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

// Update Acitem queries: _characterId and _weaponId update: name, specialties returns: new Acitem 
WeaponController.prototype.updateAcitem = function(req, res, next) {
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
		Acitem.findOneAndUpdate({
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

// delete Acitem queries: _characterId and _weaponId
WeaponController.prototype.deleteAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.findOneAndRemove({
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