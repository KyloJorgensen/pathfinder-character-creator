'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./spell.controller');

router.get('/:_characterId', controller.getSpells)
	.get('/:_characterId/:_spellId', controller.getSpell)
	.post('/', controller.createSpell)
	.put('/', controller.updateSpell)
	.delete('/', controller.deleteSpell)

module.exports = router;