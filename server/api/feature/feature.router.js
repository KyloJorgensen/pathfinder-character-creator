'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./feature.controller');

router.get('/:_characterId', controller.getFeatures)
	.get('/:_characterId/:_featureId', controller.getFeature)
	.post('/', controller.createFeature)
	.put('/', controller.updateFeature)
	.delete('/', controller.deleteFeature)

module.exports = router;