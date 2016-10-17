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
    hit_points: {type: Number, require: true, default: 0},
    land_speed: {type: Number, require: true, default: 0},
    armor_speed: {type: Number, require: true, default: 0},
    fly_speed: {type: Number, require: true, default: 0},
    climb_speed: {type: Number, require: true, default: 0},
    swim_speed: {type: Number, require: true, default: 0},
    borrow_speed: {type: Number, require: true, default: 0},
    fort_base_save: {type: Number, require: true, default: 0},
    fort_magic_mod: {type: Number, require: true, default: 0},
    fort_misc_mod: {type: Number, require: true, default: 0},
    fort_temp_mod: {type: Number, require: true, default: 0},
    ref_base_save: {type: Number, require: true, default: 0},
    ref_magic_mod: {type: Number, require: true, default: 0},
    ref_misc_mod: {type: Number, require: true, default: 0},
    ref_temp_mod: {type: Number, require: true, default: 0},
    will_base_save: {type: Number, require: true, default: 0},
    will_magic_mod: {type: Number, require: true, default: 0},
    will_misc_mod: {type: Number, require: true, default: 0},
    will_temp_mod: {type: Number, require: true, default: 0},
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }]
});

module.exports = mongoose.model('Character', characterSchema);