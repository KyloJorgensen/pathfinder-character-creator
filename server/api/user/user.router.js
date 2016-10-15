'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var authentication = require('../../middleware/authentication');

router.get('/', authentication, controller.getUser)
	.post('/', controller.createUser);

module.exports = router;