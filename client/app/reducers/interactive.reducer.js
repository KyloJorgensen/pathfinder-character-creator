'use strict';

module.exports = function(state, action, label) {
    var actions = require('../actions/interactive.actions')[label];
    var InteractiveInitialState = {};
    InteractiveInitialState[label] = [];
    InteractiveInitialState.updated = false;
    state = state || InteractiveInitialState;
    if (action.type === actions.GET_SUCCESS_ALL) {
        state[label] = action.data;
        state.updated = false;
    }
    if (action.type === actions.GET_ERROR_ALL) {
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
        for (var i = 0; i < state[label].length; i++) {
            if (state[label][i]._id == action.interactive._id) {
                state[label][i] = action.interactive;
            }
        }
    }
    if (action.type === actions.UPDATE_ERROR) {
        console.log(action.error);
    }
    return state;
};