'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var skillSchema = mongoose.Schema({
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
    specialties: String,
    key_ability: {
        type: String,
        require: true
    },
    rank: {
        type: Number,
        require: true,
        default: 0
    },
    train_only: {
        type: Boolean,
        require: true,
        default: false
    },
    trained: {
        type: Boolean,
        require: true,
        default: false
    },
    misc_bonus: {
        type: Number,
        require: true,
        default: 0
    }

});

module.exports = mongoose.model('Skill', skillSchema);