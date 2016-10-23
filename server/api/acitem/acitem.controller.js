'use strict';

var Acitem = require('./acitem.model');
var Character = require('../character/character.model');

function AcitemController() {};

// get Acitems queries: _characterId returns: Acitems
AcitemController.prototype.getAcitems = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.find({
			_userId: req._userId,
			_characterId: req.params._characterId
		}, function(error, acitems) {
			if (error) {
				reject(error);
			} else {
				resolve(acitems);
			}
		});
	}).then(function(acitems) {
		res.status(200).json(acitems);
	}).catch(function(error) {
		next(error);
	});
};

// get a Acitem queries: _characterId and _acitemId returns: Acitem
AcitemController.prototype.getAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.findOne({
			_userId: req._userId,
			_characterId: req.params._characterId,
			_id: req.params._acitemId
		}, function(error, acitem) {
			if (error) {
				reject(error);
			} else {
				resolve(acitem);
			}
		});
	}).then(function(acitem) {
		res.status(200).json(acitem);
	}).catch(function(error) {
		next(error);
	});
};

// create Acitem create: _characterId, name returns: new Acitem
AcitemController.prototype.createAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Character.findOne({
			_userId: req._userId,
			_id: req.body._characterId,
			_userId: req._userId
		}, function(error, character) {
			if (error) {
				reject(error);
			} else {
				Acitem.create({
					_userId: req._userId,
					_characterId: character._id,
					name: req.body.name
				}, {
					new: true
				}, function(error, acitem) {
					if (error) {
						reject(error);
					} else {
						resolve(acitem);
					}
				});
			}
		});
	}).then(function(acitem) {
		res.status(200).json(acitem);
	}).catch(function(error) {
		next(error);
	});
};

// Update Acitem queries: _characterId and _id update: name, specialties returns: new Acitem 
AcitemController.prototype.updateAcitem = function(req, res, next) {
	var changes = {};
	if ('body' in req) {
		if ('name' in req.body) {
			changes.name = req.body.name;
		}
		if ('bonus' in req.body) {
			changes.bonus = req.body.bonus;
		}
		if ('type' in req.body) {
			changes.type = req.body.type;
		}
		if ('check_penalty' in req.body) {
			changes.check_penalty = req.body.check_penalty;
		}
		if ('spell_failure' in req.body) {
			changes.spell_failure = req.body.spell_failure;
		}
		if ('weight' in req.body) {
			changes.weight = req.body.weight;
		}
		if ('properties' in req.body) {
			changes.properties = req.body.properties;
		}
		if ('max_dex_bonus' in req.body) {
			changes.max_dex_bonus = req.body.max_dex_bonus;
		}
	} else {
		var error = new Error('missing Body');
		error.name = 'BadRequest'
		return next(error);
	}	
	return new Promise(function(resolve, reject) {
		Acitem.findOneAndUpdate({
			_userId: req._userId,
			_characterId: req.body._characterId,
			_id: req.body._id
		}, {
			$set: changes
		}, {
			new: true
		}, function(error, acitem) {
			if (error) {
				reject(error);
			} else {
				resolve(acitem);
			}
		});
	}).then(function(acitem) {
		res.status(200).json(acitem);
	}).catch(function(error) {
		next(error);
	});
};

// delete Acitem queries: _characterId and _id
AcitemController.prototype.deleteAcitem = function(req, res, next) {
	return new Promise(function(resolve, reject) {
		Acitem.findOneAndRemove({
			_userId: req._userId,
			_id: req.body._id,
			_characterId: req.body._characterId
		}, function(error, acitem) {
			if (error) {
				reject(error);
			} else {
				resolve(acitem);
			}
		});
	}).then(function(acitem) {
		res.status(200).end();
	}).catch(function(error) {
		next(error);
	});
};

module.exports = AcitemController.prototype;