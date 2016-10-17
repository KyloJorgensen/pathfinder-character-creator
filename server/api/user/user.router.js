'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var authentication = require('../../middleware/authentication');

router.post('/', controller.createUser)
	.get('/', authentication, controller.getUserName)

module.exports = router;