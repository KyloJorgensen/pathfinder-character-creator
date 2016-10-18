'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./skill.controller');

router.get('/:characterId', controller.getSkills)
	.get('/:characterId/:skillId', controller.getSkill)
	.post('/', controller.createSkill)

module.exports = router;