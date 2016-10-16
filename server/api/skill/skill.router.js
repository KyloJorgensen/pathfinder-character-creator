'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./skill.controller');

router.get('/', controller.getSkills)

module.exports = router;