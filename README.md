# Pathfinder Character Creator
	
# SUMMARY
This app was made to be a place to make Pathfinder RPG Characters. A user needs to signup or login to an account. Then that user can create, delete, and characters. Each Character has many fields similar to the Pathfinder Character Sheet.
	
# Demo 
This is an active demo of website hosted by a server.
[https://pathfinder-character-creator.herokuapp.com/](https://pathfinder-character-creator.herokuapp.com/)

# SCREENSHOTS

	https://github.com/KyloJorgensen/pathfinder-character-creator/tree/images/screenshots

# TRAVIS CI

	https://travis-ci.org/KyloJorgensen/pathfinder-character-creator
	
# TECHNOLOGIES USED
	
	Node.js, express, npm, webpack, react, redux, CRUD Server, travis.ci, mongo, mongoose, chai, and heroku.
	
		  "dependencies": {
		    "atob": "^2.0.3",
		    "bcryptjs": "^2.3.0",
		    "body-parser": "^1.15.2",
		    "btoa": "^1.1.2",
		    "cookie": "^0.3.1",
		    "cookie-parser": "^1.4.3",
		    "express": "^4.14.0",
		    "mongoose": "^4.6.3"
		  },
		  "devDependencies": {
		    "babel-loader": "^6.2.5",
		    "babel-preset-es2015": "^6.16.0",
		    "babel-preset-react": "^6.16.0",
		    "chai": "^3.5.0",
		    "chai-http": "^3.0.0",
		    "chokidar-cli": "^1.2.0",
		    "isomorphic-fetch": "^2.2.1",
		    "less": "^2.7.1",
		    "less-plugin-clean-css": "^1.5.1",
		    "mocha": "^3.1.2",
		    "react": "^15.3.2",
		    "react-cookie": "^0.4.8",
		    "react-dom": "^15.3.2",
		    "react-redux": "^4.4.5",
		    "react-router": "^2.8.1",
		    "redux": "^3.6.0",
		    "redux-thunk": "^2.1.0",
		    "webpack": "^1.13.2"
		  }
	
# API

	USER ENDPOINT

		GET A USER NAME
		headers: "Authentication:" + document.cookie
		mathod: get
		path: user/
		returns: CharacterName

		CREATE AN USER
		headers: "Authentication:" + document.cookie
		mathod: post
		path: user/
		body: 
		      required: name, username, and password
		returns: Character

	LOGOUT ENDPOINT

		LOG OUT OF USER
		method: get
		path: user/
		returns: status 200 with a cookie attached in header

	LOGIN ENDPOINT

		LOG INTO USER
		method: post
		path: user/
		body: 
		      required: name, username, and password
		returns: status 200 with a cookie attached in header

	CHARACTER ENDPOINT

		GET ALL OF A USER'S CHARACTERS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: character/
		returns: Characters

		GET A CHARACTER
		headers: "Authentication:" + document.cookie
		mathod: get
		path: character/:_characterId/
		returns: Character

		CREATE A CHARACTER
		headers: "Authentication:" + document.cookie
		mathod: post
		path: character/
		body: 
		      required: _characterId, and name
		returns: Character

		UPDATE A CHARACTER
		headers: "Authentication:" + document.cookie
		mathod: put
		path: character/
		body: 
		      required: _characterId
		      Optional: name, ability_score_str, ability_score_dex, ability_score_con, ability_score_int, ability_score_wis, ability_score_cha, ability_score_str_temp, ability_score_dex_temp, ability_score_con_temp, ability_score_int_temp, ability_score_wis_temp, ability_score_cha_temp, race, size, class , level, base_attack_bonus, hit_points, current_hit_points, land_speed, armor_speed, climb_speed, swim_speed, borrow_speed, fort_base_save, fort_magic_mod, fort_misc_mod, fort_temp_mod, ref_base_save, ref_magic_mod, ref_misc_mod, ref_temp_mod, will_base_save, will_magic_mod, will_misc_mod, will_temp_mod, init_misc_mod, weight, height, damage_reduction, spell_resistance, size_mod, xp_points, next_level, money_cp, money_gp, money_pp, light_load, medium_load, heavy_load, lift_over_head, lift_off_ground, drag_or_push, age, gender, hair, eyes, deity, alignment, homeland, background_stories, languages, domain_and_specialty_school, level_0_spell_per_day, level_0_bonus_spells, level_0_spell_save_dc, level_0_spells_known, level_1_spell_per_day, level_1_bonus_spells, level_1_spell_save_dc, level_1_spells_known, level_2_spell_per_day, level_2_bonus_spells, level_2_spell_save_dc, level_2_spells_known, level_3_spell_per_day, level_3_bonus_spells, level_3_spell_save_dc, level_3_spells_known, level_4_spell_per_day, level_4_bonus_spells, level_4_spell_save_dc, level_4_spells_known, level_5_spell_per_day, level_5_bonus_spells, level_5_spell_save_dc, level_5_spells_known, level_6_spell_per_day, level_6_bonus_spells, level_6_spell_save_dc, level_6_spells_known, level_7_spell_per_day, level_7_bonus_spells, level_7_spell_save_dc, level_7_spells_known, level_8_spell_per_day, level_8_bonus_spells, level_8_spell_save_dc, level_8_spells_known, level_9_spell_per_day, level_9_bonus_spells, level_9_spell_save_dc, level_9_spells_known, ac_armor_bonus, ac_shild_bonus, ac_natural_armor, ac_defelection_mod, and/or ac_misc_mod 
		returns: Character

		DELETE A CHARACTER
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: character/
		body: 
		      required: _characterId, and _id
		returns: Character

	ACITEM ENDPOINT

		GET ALL OF A CHARACTER'S ACITEMS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: acitem/:_characterId
		returns: Acitems

		GET AN ACITEM
		headers: "Authentication:" + document.cookie
		mathod: get
		path: acitem/:_characterId/:_acitemId
		returns: Acitem

		CREATE AN ACITEM
		headers: "Authentication:" + document.cookie
		mathod: post
		path: acitem/
		body: 
		      required: _characterId, and name
		returns: Acitem

		UPDATE AN ACITEM
		headers: "Authentication:" + document.cookie
		mathod: put
		path: acitem/
		body: 
		      required: _characterId, and _id
		      Optional: name, type, check_penalty, spell_failure, weight, properties, and/or max_dex_bonus
		returns: Acitem

		DELETE AN ACITEM
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: acitem/
		body: 
		      required: _characterId, and _id
		returns: Acitem

	FEAT ENDPOINT

		GET ALL OF A CHARACTER'S FEATS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: feat/:_characterId
		returns: Feats

		GET A FEAT
		headers: "Authentication:" + document.cookie
		mathod: get
		path: feat/:_characterId/:_featId
		returns: Feat

		CREATE A FEAT
		headers: "Authentication:" + document.cookie
		mathod: post
		path: feat/
		body: 
		      required: _characterId, and name
		returns: Feat

		UPDATE A FEAT
		headers: "Authentication:" + document.cookie
		mathod: put
		path: feat/
		body: 
		      required: _characterId, and _id
		      Optional: name
		returns: Feat

		DELETE A FEAT
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: feat/
		body: 
		      required: _characterId, and _id
		returns: Feat

	FEATURE ENDPOINT

		GET ALL OF A CHARACTER'S FEATURES
		headers: "Authentication:" + document.cookie
		mathod: get
		path: feature/:_characterId
		returns: Features

		GET A FEATURE
		headers: "Authentication:" + document.cookie
		mathod: get
		path: feature/:_characterId/:_featureId
		returns: Feature

		CREATE A FEATURE
		headers: "Authentication:" + document.cookie
		mathod: post
		path: feature/
		body: 
		      required: _characterId, and name
		returns: Feature

		UPDATE A FEATURE
		headers: "Authentication:" + document.cookie
		mathod: put
		path: feature/
		body: 
		      required: _characterId, and _id
		      Optional: name
		returns: Feature

		DELETE A FEATURE
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: feature/
		body: 
		      required: _characterId, and _id
		returns: Feature

	GEAR ENDPOINT

		GET ALL OF A CHARACTER'S GEAR
		headers: "Authentication:" + document.cookie
		mathod: get
		path: gear/:_characterId
		returns: gear

		GET A GEAR
		headers: "Authentication:" + document.cookie
		mathod: get
		path: gear/:_characterId/:_gearId
		returns: gear

		CREATE A GEAR
		headers: "Authentication:" + document.cookie
		mathod: post
		path: gear/
		body: 
		      required: _characterId, and name
		returns: gear

		UPDATE A GEAR
		headers: "Authentication:" + document.cookie
		mathod: put
		path: gear/
		body: 
		      required: _characterId, and _id
		      Optional: name, and/or weight
		returns: gear

		DELETE A GEAR
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: gear/
		body: 
		      required: _characterId, and _id
		returns: gear

	SKILL ENDPOINT

		GET ALL OF A CHARACTER'S SKILLS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: skill/:_characterId
		returns: Skills

		GET A SKILL
		headers: "Authentication:" + document.cookie
		mathod: get
		path: skill/:_characterId/:_skillId
		returns: Skill

		CREATE A SKILL
		headers: "Authentication:" + document.cookie
		mathod: post
		path: skill/
		body: 
		      required: _characterId, and name
		returns: Skill

		UPDATE A SKILL
		headers: "Authentication:" + document.cookie
		mathod: put
		path: skill/
		body: 
		      required: _characterId, and _id
		      Optional: name, key_ability, misc_bonus, trained, train_only, and/or rank
		returns: Skill

		DELETE A SKILL
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: skill/
		body: 
		      required: _characterId, and _id
		returns: Skill

	SPELL ENDPOINT

		GET ALL OF A CHARACTER'S SPELLS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: spell/:_characterId
		returns: Spells

		GET A SPELL
		headers: "Authentication:" + document.cookie
		mathod: get
		path: spell/:_characterId/:_spellId
		returns: Spell

		CREATE A SPELL
		headers: "Authentication:" + document.cookie
		mathod: post
		path: spell/
		body: 
		      required: _characterId, and name
		returns: Spell

		UPDATE A SPELL
		headers: "Authentication:" + document.cookie
		mathod: put
		path: spell/
		body: 
		      required: _characterId, and _id
		      Optional: name, level, school, perpared, and/or used
		returns: Spell

		DELETE A SPELL
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: spell/
		body: 
		      required: _characterId, and _id
		returns: Spell

	WEAPON ENDPOINT

		GET ALL OF A CHARACTER'S WEAPONS
		headers: "Authentication:" + document.cookie
		mathod: get
		path: weapon/:_characterId
		returns: Weapons

		GET A WEAPON
		headers: "Authentication:" + document.cookie
		mathod: get
		path: weapon/:_characterId/:_weaponId
		returns: Weapon

		CREATE A WEAPON
		headers: "Authentication:" + document.cookie
		mathod: post
		path: weapon/
		body: 
		      required: _characterId, and name
		returns: Weapon

		UPDATE A WEAPON
		headers: "Authentication:" + document.cookie
		mathod: put
		path: weapon/
		body: 
		      required: _characterId, and _id
		      Optional: name, dameage_type, renage, crit, attack_bonus, damage_bonus, and/or
		returns: Weapon

		DELETE A WEAPON
		headers: "Authentication:" + document.cookie
		mathod: delete
		path: weapon/
		body: 
		      required: _characterId, and _id
		returns: Weapon
