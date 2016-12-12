'use strict';

var redux = require('redux'),
	createStore = redux.createStore,
	applyMiddleware = redux.applyMiddleware,
	thunk = require('redux-thunk').default,
	userReducer = require('./reducers/user.reducer'),
	characterReducer = require('./reducers/character.reducer'),
	navReducer = require('./reducers/nav.reducer'),
	interactiveReducer = require('./reducers/interactive.reducer'),
	interactives = require('./interactives');

var initialState = {};

var reducers = function(state, action) {
    state = state || initialState;
    var _state = {};
	_state.user = userReducer(state.user, action);
	_state.character = characterReducer(state.character, action);
	_state.nav = navReducer(state.nav, action);
	var keys = Object.keys(interactives);
	for (var i = 0; i < keys.length; i++) {
		var label = interactives[keys[i]];
		_state[label] = interactiveReducer(state[label], action, label);
	}
    return _state;
};

var store = createStore(reducers, applyMiddleware(thunk));
module.exports  = store;
