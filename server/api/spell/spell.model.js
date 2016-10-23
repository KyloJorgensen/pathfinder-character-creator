'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var spellSchema = mongoose.Schema({
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
		require: true
	},
    level: {
        type: Number,
        require: true
    },
    school: {
        type: String,
        require: true
    },
    perpared: {
        type: Number,
        require: true,
        default: 0
    },
    used: {
        type: Number,
        require: true,
        default: 0
    }
});

module.exports = mongoose.model('Spell', spellSchema);