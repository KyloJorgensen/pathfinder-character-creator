'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var featSchema = mongoose.Schema({
	_characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        require: true
    },
    name: {
		type: String,
		require: true
	},
    specialties: String

});

module.exports = mongoose.model('Feat', featSchema);