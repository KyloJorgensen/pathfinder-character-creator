'use strict';

var actions = require('../actions/character.actions');

var characterInitialState = {
    loginFailed: false,
    signupFailed: false,
    listOfCharacters: [],
    character: {}
};

var characterReducer = function(state, action) {
    state = state || characterInitialState;
    if (action.type === actions.GET_LIST_OF_CHARACTERS_SUCCESS) {
    	state.listOfCharacters = action.listOfCharacters;
    }
    if (action.type === actions.GET_LIST_OF_CHARACTERS_ERROR) {
    	state.listOfCharacters = [];
    }
    if (action.type === actions.GET_CHARACTER_SUCCESS) {
        state.character = action.character;
    }
    if (action.type === actions.GET_CHARACTER_ERROR) {
        state.character = {};
    }
    if (action.type === actions.CREATE_CHARACTER_SUCCESS) {
        state.character = action.character;
    }
    if (action.type === actions.CREATE_CHARACTER_ERROR) {
        console.log(action.error);
        state.character = {};
    }
    if (action.type === actions.DELETE_CHARACTER_SUCCESS) {
        state.character = {};
    }
    if (action.type === actions.DELETE_CHARACTER_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.UPDATE_CHARACTER_SUCCESS) {
        state.character = action.character;
    }
    if (action.type === actions.UPDATE_CHARACTER_ERROR) {
        console.log(action.error);
    }
    if (action.type === actions.GET_FEATS_SUCCESS) {
        state.feats = action.feats;
    }
    if (action.type === actions.GET_FEATS_ERROR) {
        state.feats = false;
    }
    if (action.type === actions.CREATE_FEAT_SUCCESS) {
        console.log('there');
        state.feats = false;
    }
    if (action.type === actions.CREATE_FEAT_ERROR) {
        console.log(action.error);
    }
    return state;
};

module.exports = characterReducer;