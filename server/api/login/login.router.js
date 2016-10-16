'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./login.controller');

router.post('/', controller.postLogin);

module.exports = router;