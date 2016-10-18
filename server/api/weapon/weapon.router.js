'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./weapon.controller');

router.get('/:_characterId', controller.getWeapons)
	.get('/:_characterId/:_weaponId', controller.getWeapon)
	.post('/', controller.createWeapon)
	.put('/', controller.updateWeapon)
	.delete('/', controller.deleteWeapon)

module.exports = router;