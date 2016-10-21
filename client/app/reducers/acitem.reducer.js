'use strict';

var actions = require('../actions/acitem.actions');

var acitemInitialState = {
    acitems: [],
    updated: false
};

var acitemReducer = function(state, action) {
    state = state || acitemInitialState;
    if (action.type === actions.GET_ACITEMS_SUCCESS) {
        state.acitems = action.acitems;
        state.updated = false;
    }
    if (action.type === actions.GET_ACITEMS_ERROR) {
        state.acitems = [];
        state.updated = false;
    }
    if (action.type === actions.CREATE_ACITEM_SUCCESS) {
    	state.acitems = [];
        state.updated = true;
    }
    if (action.type === actions.CREATE_ACITEM_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.DELETE_ACITEM_SUCCESS) {
    	state.acitems = [];
    	console.log('delete')
        state.updated = true;
    }
    if (action.type === actions.DELETE_ACITEM_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.UPDATE_ACITEM_SUCCESS) {
    	state.acitems = [];
        state.updated = true;
    }
    if (action.type === actions.UPDATE_ACITEM_ERROR) {
        console.log(action.error);
    }
    return state;
};

module.exports = acitemReducer;