'use strict';

var Skill = require('./skill.model');
var Character = require('../character/character.model');

function SkillController() {};

// get skills from params characterId return characters skills
SkillController.prototype.getSkills = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.find({
			_characterId: req.params.characterId
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

SkillController.prototype.getSkill = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.findOne({
			_characterId: req.params.characterId,
			_id: req.params.skillId
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

// create skill from name and key_ability returns new skill
SkillController.prototype.createSkill = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Skill.create({
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

module.exports = SkillController.prototype;