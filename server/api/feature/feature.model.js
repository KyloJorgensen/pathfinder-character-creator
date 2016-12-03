'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var featureSchema = mongoose.Schema({
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
	}

});

module.exports = mongoose.model('Feature', featureSchema);