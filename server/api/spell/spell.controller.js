'use strict';

var Spell = require('./spell.model');
var Character = require('../character/character.model');

function SpellController() {};

// get Spells queries: _characterId returns: Spells
SpellController.prototype.getSpells = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Spell.find({
			_userId: req._userId,
			_characterId: req.params._characterId
		}, function(error, spells) {
			if (error) {
				reject(error);
			} else {
				resolve(spells);
			}
		});
	}).then(function(spells) {
		res.status(200).json(spells);
	}).catch(function(error) {
		next(error);
	});
};

// get a Spell queries: _characterId and _spellId returns: Spell
SpellController.prototype.getSpell = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Spell.findOne({
			_userId: req._userId,
			_characterId: req.params._characterId,
			_id: req.params._spellId
		}, function(error, spell) {
			if (error) {
				reject(error);
			} else {
				resolve(spell);
			}
		});
	}).then(function(spell) {
		res.status(200).json(spell);
	}).catch(function(error) {
		next(error);
	});
};

// create Spell create: _characterId, name returns: new Spell
SpellController.prototype.createSpell = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_userId: req._userId,
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Spell.create({
					_userId: req._userId,
					_characterId: character._id,
					name: req.body.name
				}, {
					new: true
				}, function(error, spell) {
					if (error) {
						reject(error);
					} else {
						resolve(spell);
					}
				});
			}
		});
	}).then(function(spell) {
		res.status(200).json(spell);
	}).catch(function(error) {
		next(error);
	});
};

// Update Spell queries: _characterId and _id update: name, level, school, prepared, and/or used returns: new Spell 
SpellController.prototype.updateSpell = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
		if ('level' in req.body) {
			changes.level = req.body.level;
		}
		if ('school' in req.body) {
			changes.school = req.body.school;
		}
		if ('prepared' in req.body) {
			changes.prepared = req.body.prepared;
		}
		if ('used' in req.body) {
			changes.used = req.body.used;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequestError'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Spell.findOneAndUpdate({
			_userId: req._userId,
			_characterId: req.body._characterId,
			_id: req.body._id
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, spell) {
			if (error) {
				reject(error);
			} else {
				resolve(spell);
			}
		});
	}).then(function(spell) {
		res.status(200).json(spell);
	}).catch(function(error) {
		next(error);
	});
};

// delete Spell queries: _characterId and _id
SpellController.prototype.deleteSpell = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Spell.findOneAndRemove({
			_userId: req._userId,
			_id: req.body._id,
			_characterId: req.body._characterId
		}, function(error, spell) {
			if (error) {
				reject(error);
			} else {
				resolve(spell);
			}
		});
	}).then(function(spell) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = SpellController.prototype;