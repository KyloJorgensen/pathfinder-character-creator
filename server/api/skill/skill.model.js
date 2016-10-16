'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');
var User = require('../user/user.model');

var characterSchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
	_characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        require: true
    },
    name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Skill', characterSchema);