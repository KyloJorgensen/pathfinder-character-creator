'use strict';

var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json())   
    	.use(bodyParser.urlencoded({extended: false}))
    	.use(express.static(path.join(__dirname , '../../build/')));
};