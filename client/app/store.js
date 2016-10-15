'use strict';

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;


var initialState = {};

var reducers = function(state, action) {
    state = state || initialState;
    return {
    	
    };
};

var store = createStore(reducers, applyMiddleware(thunk));
module.exports  = store;
