'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./acitem.controller');

router.get('/:_characterId', controller.getAcitems)
	.get('/:_characterId/:_acitemId', controller.getAcitem)
	.post('/', controller.createAcitem)
	.put('/', controller.updateAcitem)
	.delete('/', controller.deleteAcitem)

module.exports = router;