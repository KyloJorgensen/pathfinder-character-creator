'use strict';

module.exports = function(state, action, label) {
    var actions = require('../actions/interactive.actions')[label];
    var InteractiveInitialState = {};
    InteractiveInitialState[label] = [];
    InteractiveInitialState.updated = false;
    state = state || InteractiveInitialState;
    if (action.type === actions.GET_SUCCESS) {
        state[label] = action.data;
        state.updated = false;
    }
    if (action.type === actions.GET_ERROR) {
        state[label] = [];
        state.updated = false;
    }
    if (action.type === actions.CREATE_SUCCESS) {
        state[label] = [];
        state.updated = true;
    }
    if (action.type === actions.CREATE_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.REMOVE_SUCCESS) {
        state[label] = [];
        state.updated = true;
    }
    if (action.type === actions.REMOVE_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.UPDATE_SUCCESS) {
        state[label] = [];
        state.updated = true;
    }
    if (action.type === actions.UPDATE_ERROR) {
        console.log(action.error);
    }
    return state;
};