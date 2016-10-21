'use strict';

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;
var userReducer = require('./reducers/user.reducer');
var characterReducer = require('./reducers/character.reducer');
var featReducer = require('./reducers/feat.reducer');
var acitemReducer = require('./reducers/acitem.reducer');

var initialState = {};

var reducers = function(state, action) {
    state = state || initialState;
    return {
    	user: userReducer(state.user, action),
    	character: characterReducer(state.character, action),
    	feat: featReducer(state.feat, action),
    	acitem: acitemReducer(state.acitem, action)
    };
};

var store = createStore(reducers, applyMiddleware(thunk));
module.exports  = store;
