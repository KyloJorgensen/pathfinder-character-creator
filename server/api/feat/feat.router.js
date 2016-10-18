'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./feat.controller');

router.get('/:_characterId', controller.getFeats)
	.get('/:_characterId/:_featId', controller.getFeat)
	.post('/', controller.createFeat)
	.put('/', controller.updateFeat)
	.delete('/', controller.deleteFeat)

module.exports = router;