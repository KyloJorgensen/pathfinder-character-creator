'use strict';

var Character = require('./character.model');
var User = require('../user/user.model');

function CharacterController() {};

CharacterController.prototype.getCharacters = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.find({_userId: req._userId}, function(error, characters) {
			if (error) {
				reject(error);
			} else {
				resolve(characters);
			}
		});
	}).then(function(characters) {
		res.status(200).json(characters);
	}).catch(function(error) {
		next(error);
	});
};

CharacterController.prototype.getCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_id: req.params.characterId, 
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				resolve(character);
			}
		});
	}).then(function(character) {
		res.status(200).json(character);
	}).catch(function(error) {
		next(error);
	});
};

CharacterController.prototype.createCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		User.findOne({
			_id: req._userId
		}, function(error, user) {
			if (error) {
				reject(error);
			} else {
				Character.create({
					_userId: user._id,
					name: req.body.name
				}, function(error, character) {
					if (error) {
						reject(error);
					} else {
						resolve(character);
					}
				});				
			}
		});
	}).then(function(character) {
		res.status(200).json(character);
	}).catch(function(error) {
		next(error);
	});
};

CharacterController.prototype.deleteCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOneAndRemove({
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				resolve(character);
			}
		});
	}).then(function(character) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

CharacterController.prototype.updateCharacter = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
	    if('ability_score_str' in req.body) {
	    	changes.ability_score_str = req.body.ability_score_str;
	    }
	    if('ability_score_dex' in req.body) {
	    	changes.ability_score_dex = req.body.ability_score_dex;
	    }
	    if('ability_score_con' in req.body) {
	    	changes.ability_score_con = req.body.ability_score_con;
	    }
	    if('ability_score_int' in req.body) {
	    	changes.ability_score_int = req.body.ability_score_int;
	    }
	    if('ability_score_wis' in req.body) {
	    	changes.ability_score_wis = req.body.ability_score_wis;
	    }
	    if('ability_score_cha' in req.body) {
	    	changes.ability_score_cha = req.body.ability_score_cha;
	    }
		if ('ability_score_str_temp' in req.body) {
			changes.ability_score_str_temp = req.body.ability_score_str_temp;
		}
		if ('ability_score_dex_temp' in req.body) {
			changes.ability_score_dex_temp = req.body.ability_score_dex_temp;
		}
		if ('ability_score_con_temp' in req.body) {
			changes.ability_score_con_temp = req.body.ability_score_con_temp;
		}
		if ('ability_score_int_temp' in req.body) {
			changes.ability_score_int_temp = req.body.ability_score_int_temp;
		}
		if ('ability_score_wis_temp' in req.body) {
			changes.ability_score_wis_temp = req.body.ability_score_wis_temp;
		}
		if ('ability_score_cha_temp' in req.body) {
			changes.ability_score_cha_temp = req.body.ability_score_cha_temp;
		}
	    if ('race' in req.body) {
	    	changes.race = req.body.race;
	    }
	    if ('size' in req.body) {
	    	changes.size = req.body.size;
	    }
	    if ('class' in req.body) {
	    	changes.class = req.body.class;
	    }
	    if ('level' in req.body) {
	    	changes.level = req.body.level;
	    }
	    if ('base_attack_bonus' in req.body) {
	    	changes.base_attack_bonus = req.body.base_attack_bonus;
	    }
	    if ('hit_points' in req.body) {
	    	changes.hit_points = req.body.hit_points;
	    }
	    if ('current_hit_points' in req.body) {
	    	changes.current_hit_points = req.body.current_hit_points;
	    }
	    if ('land_speed' in req.body) {
	    	changes.land_speed = req.body.land_speed;
	    }
	    if ('armor_speed' in req.body) {
	    	changes.armor_speed = req.body.armor_speed;
	    }
	    if ('fly_speed' in req.body) {
	    	changes.fly_speed = req.body.fly_speed;
	    }
	    if ('climb_speed' in req.body) {
	    	changes.climb_speed = req.body.climb_speed;
	    }
	    if ('swim_speed' in req.body) {
	    	changes.swim_speed = req.body.swim_speed;
	    }
	    if ('borrow_speed' in req.body) {
	    	changes.borrow_speed = req.body.borrow_speed;
	    }
		if ('fort_base_save' in req.body) {
			changes.fort_base_save = req.body.fort_base_save;
		}
		if ('fort_magic_mod' in req.body) {
			changes.fort_magic_mod = req.body.fort_magic_mod;
		}
		if ('fort_misc_mod' in req.body) {
			changes.fort_misc_mod = req.body.fort_misc_mod;
		}
		if ('fort_temp_mod' in req.body) {
			changes.fort_temp_mod = req.body.fort_temp_mod;
		}
		if ('ref_base_save' in req.body) {
			changes.ref_base_save = req.body.ref_base_save;
		}
		if ('ref_magic_mod' in req.body) {
			changes.ref_magic_mod = req.body.ref_magic_mod;
		}
		if ('ref_misc_mod' in req.body) {
			changes.ref_misc_mod = req.body.ref_misc_mod;
		}
		if ('ref_temp_mod' in req.body) {
			changes.ref_temp_mod = req.body.ref_temp_mod;
		}
		if ('will_base_save' in req.body) {
			changes.will_base_save = req.body.will_base_save;
		}
		if ('will_magic_mod' in req.body) {
			changes.will_magic_mod = req.body.will_magic_mod;
		}
		if ('will_misc_mod' in req.body) {
			changes.will_misc_mod = req.body.will_misc_mod;
		}
		if ('will_temp_mod' in req.body) {
			changes.will_temp_mod = req.body.will_temp_mod;
		}
		if ('init_misc_mod' in req.body) {
			changes.init_misc_mod = req.body.init_misc_mod;
		}
		if ('weight' in req.body) {
			changes.weight = req.body.weight;
		}
		if ('height' in req.body) {
			changes.height = req.body.height;
		}
		if ('damage_reduction' in req.body) {
			changes.damage_reduction = req.body.damage_reduction;
		}
		if ('spell_resistance' in req.body) {
			changes.spell_resistance = req.body.spell_resistance;
		}
		if ('size_mod' in req.body) {
			changes.size_mod = req.body.size_mod;
		}
		if ('xp_points' in req.body) {
			changes.xp_points = req.body.xp_points;
		}
		if ('next_level' in req.body) {
			changes.next_level = req.body.next_level;
		}
		if ('money_cp' in req.body) {
			changes.money_cp = req.body.money_cp;
		}
		if ('money_sp' in req.body) {
			changes.money_sp = req.body.money_sp;
		}
		if ('money_gp' in req.body) {
			changes.money_gp = req.body.money_gp;
		}
		if ('money_pp' in req.body) {
			changes.money_pp = req.body.money_pp;
		}
		if ('light_load' in req.body) {
			changes.light_load = req.body.light_load;
		}
		if ('medium_load' in req.body) {
			changes.medium_load = req.body.medium_load;
		}
		if ('heavy_load' in req.body) {
			changes.heavy_load = req.body.heavy_load;
		}
		if ('lift_over_head' in req.body) {
			changes.lift_over_head = req.body.lift_over_head;
		}
		if ('lift_off_ground' in req.body) {
			changes.lift_off_ground = req.body.lift_off_ground;
		}
		if ('drag_or_push' in req.body) {
			changes.drag_or_push = req.body.drag_or_push;
		}
		if ('age' in req.body) {
			changes.age = req.body.age;
		}
		if ('gender' in req.body) {
			changes.gender = req.body.gender;
		}
		if ('hair' in req.body) {
			changes.hair = req.body.hair;
		}
		if ('eyes' in req.body) {
			changes.eyes = req.body.eyes;
		}
		if ('deity' in req.body) {
			changes.deity = req.body.deity;
		}
		if ('alignment' in req.body) {
			changes.alignment = req.body.alignment;
		}
		if ('homeland' in req.body) {
			changes.homeland = req.body.homeland;
		}
		if ('background_stories' in req.body) {
			changes.background_stories = req.body.background_stories;
		}
		if ('languages' in req.body) {
			changes.languages = req.body.languages;
		}
		if ('domain_and_specialty_school' in req.body) {
			changes.domain_and_specialty_school = req.body.domain_and_specialty_school;
		}
		if ('level_0_spell_per_day' in req.body) {
			changes.level_0_spell_per_day = req.body.level_0_spell_per_day;
		}
		if ('level_0_bonus_spells' in req.body) {
			changes.level_0_bonus_spells = req.body.level_0_bonus_spells;
		}
		if ('level_0_spell_save_dc' in req.body) {
			changes.level_0_spell_save_dc = req.body.level_0_spell_save_dc;
		}
		if ('level_0_spells_known' in req.body) {
			changes.level_0_spells_known = req.body.level_0_spells_known;
		}
		if ('level_1_spell_per_day' in req.body) {
			changes.level_1_spell_per_day = req.body.level_1_spell_per_day;
		}
		if ('level_1_bonus_spells' in req.body) {
			changes.level_1_bonus_spells = req.body.level_1_bonus_spells;
		}
		if ('level_1_spell_save_dc' in req.body) {
			changes.level_1_spell_save_dc = req.body.level_1_spell_save_dc;
		}
		if ('level_1_spells_known' in req.body) {
			changes.level_1_spells_known = req.body.level_1_spells_known;
		}
		if ('level_2_spell_per_day' in req.body) {
			changes.level_2_spell_per_day = req.body.level_2_spell_per_day;
		}
		if ('level_2_bonus_spells' in req.body) {
			changes.level_2_bonus_spells = req.body.level_2_bonus_spells;
		}
		if ('level_2_spell_save_dc' in req.body) {
			changes.level_2_spell_save_dc = req.body.level_2_spell_save_dc;
		}
		if ('level_2_spells_known' in req.body) {
			changes.level_2_spells_known = req.body.level_2_spells_known;
		}
		if ('level_3_spell_per_day' in req.body) {
			changes.level_3_spell_per_day = req.body.level_3_spell_per_day;
		}
		if ('level_3_bonus_spells' in req.body) {
			changes.level_3_bonus_spells = req.body.level_3_bonus_spells;
		}
		if ('level_3_spell_save_dc' in req.body) {
			changes.level_3_spell_save_dc = req.body.level_3_spell_save_dc;
		}
		if ('level_3_spells_known' in req.body) {
			changes.level_3_spells_known = req.body.level_3_spells_known;
		}
		if ('level_4_spell_per_day' in req.body) {
			changes.level_4_spell_per_day = req.body.level_4_spell_per_day;
		}
		if ('level_4_bonus_spells' in req.body) {
			changes.level_4_bonus_spells = req.body.level_4_bonus_spells;
		}
		if ('level_4_spell_save_dc' in req.body) {
			changes.level_4_spell_save_dc = req.body.level_4_spell_save_dc;
		}
		if ('level_4_spells_known' in req.body) {
			changes.level_4_spells_known = req.body.level_4_spells_known;
		}
		if ('level_5_spell_per_day' in req.body) {
			changes.level_5_spell_per_day = req.body.level_5_spell_per_day;
		}
		if ('level_5_bonus_spells' in req.body) {
			changes.level_5_bonus_spells = req.body.level_5_bonus_spells;
		}
		if ('level_5_spell_save_dc' in req.body) {
			changes.level_5_spell_save_dc = req.body.level_5_spell_save_dc;
		}
		if ('level_5_spells_known' in req.body) {
			changes.level_5_spells_known = req.body.level_5_spells_known;
		}
		if ('level_6_spell_per_day' in req.body) {
			changes.level_6_spell_per_day = req.body.level_6_spell_per_day;
		}
		if ('level_6_bonus_spells' in req.body) {
			changes.level_6_bonus_spells = req.body.level_6_bonus_spells;
		}
		if ('level_6_spell_save_dc' in req.body) {
			changes.level_6_spell_save_dc = req.body.level_6_spell_save_dc;
		}
		if ('level_6_spells_known' in req.body) {
			changes.level_6_spells_known = req.body.level_6_spells_known;
		}
		if ('level_7_spell_per_day' in req.body) {
			changes.level_7_spell_per_day = req.body.level_7_spell_per_day;
		}
		if ('level_7_bonus_spells' in req.body) {
			changes.level_7_bonus_spells = req.body.level_7_bonus_spells;
		}
		if ('level_7_spell_save_dc' in req.body) {
			changes.level_7_spell_save_dc = req.body.level_7_spell_save_dc;
		}
		if ('level_7_spells_known' in req.body) {
			changes.level_7_spells_known = req.body.level_7_spells_known;
		}
		if ('level_8_spell_per_day' in req.body) {
			changes.level_8_spell_per_day = req.body.level_8_spell_per_day;
		}
		if ('level_8_bonus_spells' in req.body) {
			changes.level_8_bonus_spells = req.body.level_8_bonus_spells;
		}
		if ('level_8_spell_save_dc' in req.body) {
			changes.level_8_spell_save_dc = req.body.level_8_spell_save_dc;
		}
		if ('level_8_spells_known' in req.body) {
			changes.level_8_spells_known = req.body.level_8_spells_known;
		}
		if ('level_9_spell_per_day' in req.body) {
			changes.level_9_spell_per_day = req.body.level_9_spell_per_day;
		}
		if ('level_9_bonus_spells' in req.body) {
			changes.level_9_bonus_spells = req.body.level_9_bonus_spells;
		}
		if ('level_9_spell_save_dc' in req.body) {
			changes.level_9_spell_save_dc = req.body.level_9_spell_save_dc;
		}
		if ('level_9_spells_known' in req.body) {
			changes.level_9_spells_known = req.body.level_9_spells_known;
		}
		if ('ac_armor_bonus' in req.body) {
			changes.ac_armor_bonus = req.body.ac_armor_bonus;
		}
		if ('ac_shild_bonus' in req.body) {
			changes.ac_shild_bonus = req.body.ac_shild_bonus;
		}
		if ('ac_natural_armor' in req.body) {
			changes.ac_natural_armor = req.body.ac_natural_armor;
		}
		if ('ac_defelection_mod' in req.body) {
			changes.ac_defelection_mod = req.body.ac_defelection_mod;
		}
		if ('ac_misc_mod' in req.body) {
			changes.ac_misc_mod = req.body.ac_misc_mod;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}
	return new Promise(function(resolve, reject) {
		Character.findOneAndUpdate({
			_id: req.body._id,
			_userId: req._userId
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				resolve(character);
			}
		});
	}).then(function(character) {
		res.status(200).json(character);
	}).catch(function(error) {
		next(error);
	});
};

module.exports = CharacterController.prototype;