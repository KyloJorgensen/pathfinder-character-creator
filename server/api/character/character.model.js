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
    ability_score_str: {type: Number, require: true, default: 10},
    ability_score_dex: {type: Number, require: true, default: 10},
    ability_score_con: {type: Number, require: true, default: 10},
    ability_score_int: {type: Number, require: true, default: 10},
    ability_score_wis: {type: Number, require: true, default: 10},
    ability_score_cha: {type: Number, require: true, default: 10},
    race: {type: String, require: true, default: 'RACE'},
    size: {type: String, require: true, default: 'Medium'},
    class: {type: String, require: true, default: 'CLASS'},
    level: {type: Number, require: true, default: 0},
    base_attack_bonus: {type: Number, require: true, default: 0},
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }]
});

module.exports = mongoose.model('Character', characterSchema);