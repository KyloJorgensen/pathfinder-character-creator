'use strict';

var mongoose = require('mongoose');
var User = require('../user/user.model');

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
    ability_score_str_temp: {type: Number, require: true, default: 0},
    ability_score_dex_temp: {type: Number, require: true, default: 0},
    ability_score_con_temp: {type: Number, require: true, default: 0},
    ability_score_int_temp: {type: Number, require: true, default: 0},
    ability_score_wis_temp: {type: Number, require: true, default: 0},
    ability_score_cha_temp: {type: Number, require: true, default: 0},
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
    init_misc_mod: {type: Number, require: true, default: 0},
    weight: {type: Number, require: true, default: 0},
    height: {type: Number, require: true, default: 0},
    damage_reduction: {type: Number, require: true, default: 0},
    spell_resistance: {type: Number, require: true, default: 0},
    size_mod: {type: Number, require: true, default: 0},
    xp_points: {type: Number, require: true, default: 0},
    next_level: {type: Number, require: true, default: 0},
    money_cp: {type: Number, require: true, default: 0},
    money_sp: {type: Number, require: true, default: 0},
    money_gp: {type: Number, require: true, default: 0},
    money_pp: {type: Number, require: true, default: 0},
    light_load: {type: Number, require: true, default: 0},
    medium_load: {type: Number, require: true, default: 0},
    heavy_load: {type: Number, require: true, default: 0},
    lift_over_head: {type: Number, require: true, default: 0},
    lift_off_ground: {type: Number, require: true, default: 0},
    drag_or_push: {type: Number, require: true, default: 0},
    age: {type: Number, require: true, default: 0},
    gender: {type: String, require: true, default: 'GENDER'},
    hair: {type: String, require: true, default: 'HAIR'},
    eyes: {type: String, require: true, default: 'EYES'},
    deity: {type: String, require: true, default: 'DEITY'},
    alignment: {type: String, require: true, default: 'ALIGNMENT'},
    homeland: {type: String, require: true, default: 'HOMELAND'},
    background_stories: {type: String, require: true, default: 'BACKGROUND'},
    languages: {type: String, require: true, default: 'LANGUAGES'},
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    features: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
    }],
    feats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feat'
    }],
    gear: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gear'
    }],
    acitems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acitem'
    }],
    weapons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Weapon'
    }]
});

module.exports = mongoose.model('Character', characterSchema);