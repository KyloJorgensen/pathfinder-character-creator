'use strict';

var actions = require('../actions/feat.actions');

var featInitialState = {
    feats: [],
    updated: false
};

var featReducer = function(state, action) {
    state = state || featInitialState;
    if (action.type === actions.GET_FEATS_SUCCESS) {
        state.feats = action.feats;
        state.updated = false;
    }
    if (action.type === actions.GET_FEATS_ERROR) {
        state.feats = [];
        state.updated = false;
    }
    if (action.type === actions.CREATE_FEAT_SUCCESS) {
    	state.feats = [];
        state.updated = true;
    }
    if (action.type === actions.CREATE_FEAT_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.DELETE_FEAT_SUCCESS) {
    	state.feats = [];
    	console.log('delete')
        state.updated = true;
    }
    if (action.type === actions.DELETE_FEAT_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.UPDATE_FEAT_SUCCESS) {
    	state.feats = [];
        state.updated = true;
    }
    if (action.type === actions.UPDATE_FEAT_ERROR) {
        console.log(action.error);
    }
    return state;
};

module.exports = featReducer;