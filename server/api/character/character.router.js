'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./character.controller');

router.get('/', controller.getCharacters)
	.get('/:characterId', controller.getCharacter)
	.post('/', controller.createCharacter)
	.delete('/', controller.deleteCharacter)
	.put('/', controller.updateCharacter)

module.exports = router;