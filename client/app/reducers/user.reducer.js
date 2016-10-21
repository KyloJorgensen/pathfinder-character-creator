'use strict';

var actions = require('../actions/user.actions');

var userInitialState = {
    loginFailed: false,
    signupFailed: false,
    name: null
};

var userReducer = function(state, action) {
    state = state || userInitialState;
    if (action.type === actions.GET_USER_NAME_SUCCESS) {
    	state.name = action.name;
    }
    if (action.type === actions.GET_USER_NAME_ERROR) {
    	console.log(action.error);
    }
	if (action.type === actions.LOGIN_SUCCESS){
        state.loginFailed = false
	}  
	if (action.type === actions.LOGIN_ERROR){
        state.loginFailed = true;
	}
    if (action.type === actions.SIGNUP_SUCCESS){
        state.signupFailed = false
    }  
    if (action.type === actions.SIGNUP_ERROR){
        state.signupFailed = true;
    }
    return state;
};

module.exports = userReducer;