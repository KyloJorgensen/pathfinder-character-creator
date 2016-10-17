'use strict';

var Skill = require('./skill.model');

function SkillController() {};

SkillController.prototype.getSkills = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Skill.find({
			_userId: req._userId
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

module.exports = SkillController.prototype;