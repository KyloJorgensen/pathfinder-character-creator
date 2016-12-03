'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./gear.controller');

router.get('/:_characterId', controller.getAllGear)
	.get('/:_characterId/:_gearId', controller.getGear)
	.post('/', controller.createGear)
	.put('/', controller.updateGear)
	.delete('/', controller.deleteGear)

module.exports = router;