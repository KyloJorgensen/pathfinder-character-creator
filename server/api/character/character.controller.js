'use strict';

var Character = require('./character.model');

function LoginController() {};

LoginController.prototype.getCharacters = function(req, res, next) {
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

LoginController.prototype.getCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.find({
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


LoginController.prototype.createCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.create({
			_userId: req._userId,
			name: req.body.name
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

LoginController.prototype.deleteCharacter = function(req, res, next) {
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

LoginController.prototype.updateCharacter = function(req, res, next) {
	return new Promise(function(resolve, reject) {

		var changes = {};

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

module.exports = LoginController.prototype;