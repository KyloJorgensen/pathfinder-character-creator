'use strict';

var mongoose = require('mongoose');
var Character = require('../character/character.model');

var gearSchema = mongoose.Schema({
	_characterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        require: true
    },
    name: {
		type: String,
		require: true
	},
    weight: {
        type: Number,
        require: true,
        default: 0
    }

});

module.exports = mongoose.model('Gear', gearSchema);