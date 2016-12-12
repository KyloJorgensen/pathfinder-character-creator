'use strict';

var actions = require('../actions/nav.actions.js');

var navInitialState = {
    bodyClicked: false,
    overMenu: false,
    menuDisplay: 'none'
};

var navReducer = function(state, action) {
    state = state || navInitialState;
    if (action.type === actions.BODY_CLICKED) {
    	state.bodyClicked = action.status;
    }
    if (action.type === actions.OVER_MENU) {
        state.overMenu = action.status;
    }
    if (action.type === actions.MENU_DISPLAY) {
        if (action.status == true) {
            state.menuDisplay = 'block';
        } else {
            state.menuDisplay = 'none';
        }
       
    }
    return state;
};

module.exports = navReducer;