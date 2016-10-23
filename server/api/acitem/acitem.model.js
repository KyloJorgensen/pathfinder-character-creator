'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var acitemSchema = mongoose.Schema({
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
    bonus: {
        type: Number,
        require: true,
        default: 0
    },
    type: {
        type: String,
        require: true,
        default: 'TYPE'
    },
    check_penalty: {
        type: Number,
        require: true,
        default: 0
    },
    spell_failure: {
        type: Number,
        require: true,
        default: 0
    },
    weight: {
        type: Number,
        require: true,
        default: 0
    },
    properties: {
        type: String,
        require: true,
        default: 'n/a'
    },
    max_dex_bonus: {
        type: Number,
        require: true,
        default: 0
    }

});

module.exports = mongoose.model('Acitem', acitemSchema);