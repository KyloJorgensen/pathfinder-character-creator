'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var weaponSchema = mongoose.Schema({
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
    damage_type: {
        type: String,
        require: true,
        default: 'Damage Type'
    },
    range: {
        type: Number,
        require: true,
        default: 0
    },
    crit: {
        type: String,
        require: true,
        default: 'Critical'
    },
    attack_bonus: {
        type: Number,
        require: true,
        default: 0
    },
    damage_bonus: {
        type: Number,
        require: true,
        default: 0
    },
    damage_dice: {
        type: String,
        require: true,
        default: "Damage Dice"
    }


});

module.exports = mongoose.model('Weapon', weaponSchema);