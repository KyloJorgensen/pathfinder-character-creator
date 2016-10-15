'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./login.controller');
var authentication = require('../../middleware/authentication');

router.post('/', controller.postLogin)
	.get('/', controller.getLogin);

module.exports = router;