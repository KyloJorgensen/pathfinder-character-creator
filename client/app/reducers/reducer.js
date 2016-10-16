'use strict';

var actions = require('../actions/actions');

var _InitialState = {
    loginSatus: false,
	access_token: false,
	refresh_token: false
};

var _Reducer = function(state, action) {
    state = state || _InitialState;
    if (action.type === actions.GET_USER_SUCCESS) {
    }

    return state;
};

module.exports = _Reducer;