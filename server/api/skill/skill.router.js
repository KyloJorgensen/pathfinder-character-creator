'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./skill.controller');

router.get('/:_characterId', controller.getSkills)
	.get('/:_characterId/:_skillId', controller.getSkill)
	.post('/', controller.createSkill)
	.put('/', controller.updateSkill)
	.delete('/', controller.deleteSkill)

module.exports = router;