'use strict';

var Skill = require('./skill.model');
var Character = require('../character/character.model');

function SkillController() {};

// get skills queries: _characterId returns: Skills
SkillController.prototype.getSkills = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.find({
			_userId: req._userId,
			_characterId: req.params._characterId
		}, function(error, skills) {
			if (error) {
				reject(error);
			} else {
				resolve(skills);
			}
		});
	}).then(function(skills) {
		res.status(200).json(skills);
	}).catch(function(error) {
		next(error);
	});
};

// get a skill queries: _characterId and _skillId returns: Skill
SkillController.prototype.getSkill = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.findOne({
			_userId: req._userId,
			_characterId: req.params._characterId,
			_id: req.params._skillId
		}, function(error, skill) {
			if (error) {
				reject(error);
			} else {
				resolve(skill);
			}
		});
	}).then(function(skill) {
		res.status(200).json(skill);
	}).catch(function(error) {
		next(error);
	});
};

// create skill create: _characterId, name, and key_ability returns: new skill
SkillController.prototype.createSkill = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.body._characterId,
			_userId: req._userId,		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Skill.create({
					_userId: req._userId,
					_characterId: character._id,
					name: req.body.name,
					key_ability: req.body.key_ability
				}, {
					new: true
				}, function(error, skill) {
					if (error) {
						reject(error);
					} else {
						resolve(skill);
					}
				});
			}
		});
	}).then(function(skill) {
		res.status(200).json(skill);
	}).catch(function(error) {
		next(error);
	});
};

// Update Skill queries: _characterId and _id update: name, key_ability, misc_bonus, trained, train_only, and/or rank returns: new Skill 
SkillController.prototype.updateSkill = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
		if ('specialties' in req.body) {
			changes.specialties = req.body.specialties;
		}
           if('key_ability' in req.body) {
           	changes.key_ability = req.body.key_ability;
           }
           if('misc_bonus' in req.body) {
           	changes.misc_bonus = req.body.misc_bonus;
           }
           if('trained' in req.body) {
           	changes.trained = req.body.trained;
           }
           if('train_only' in req.body) {
           	changes.train_only = req.body.train_only;
           }
           if('rank' in req.body) {
           	changes.rank = req.body.rank;
           }
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Skill.findOneAndUpdate({
			_userId: req._userId,
			_characterId: req.body._characterId,
			_id: req.body._id
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, skill) {
			if (error) {
				reject(error);
			} else {
				resolve(skill);
			}
		});
	}).then(function(skill) {
		res.status(200).json(skill);
	}).catch(function(error) {
		next(error);
	});
};

// delete skill queries: _characterId and _id
SkillController.prototype.deleteSkill = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.findOneAndRemove({
			_userId: req._userId,
			_id: req.body._id,
			_characterId: req.body._characterId
		}, function(error, skill) {
			if (error) {
				reject(error);
			} else {
				resolve(skill);
			}
		});
	}).then(function(skill) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = SkillController.prototype;