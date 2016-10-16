'use strict';

var mongoose = require('mongoose');
var User = require('../user/user.model');
var Skill = require('../skill/skill.model');

var characterSchema = mongoose.Schema({
	_userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
		type: String,
		required: true
	},
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }]
});

module.exports = mongoose.model('Character', characterSchema);