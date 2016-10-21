'use strict';

var fetch = require('isomorphic-fetch');
var redirect = false;

var getUserName = function() {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: GET_USER_NAME_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: GET_USER_NAME_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: GET_USER_NAME_ERROR,
            error: error
        };
    }
    return function(dispatch) {
        var url = '/user';
        return fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authentication': document.cookie
            },
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(getUserNameSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getUserNameError(error));
        });
    }
};

var GET_USER_NAME_SUCCESS = 'GET_USER_NAME_SUCCESS';
var getUserNameSuccess = function(data) {
    redirect = false;
    return {
        type: GET_USER_NAME_SUCCESS,
        name: data
    };
};

var GET_USER_NAME_ERROR = 'GET_USER_NAME_ERROR';
var getUserNameError = function(error) {
    redirect = false;
    return {
        type: GET_USER_NAME_ERROR,
        error: error
    };
};

var login = function(username, password, that) {
    var payload = {
        username: username,
        password: password
    };
    return function(dispatch) {
        redirect = that.props.history;
        var url = '/login';
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),     
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(loginSuccess(data));
        })
        .catch(function(error) {
            return dispatch(loginError(error));
        });
    }
};

var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var loginSuccess = function(data) {
    redirect.replace('/user');
    redirect = false;
    return {
        type: LOGIN_SUCCESS,
        data: data
    };
};

var LOGIN_ERROR = 'LOGIN_ERROR';
var loginError = function(error) {
    redirect = false;
    return {
        type: LOGIN_ERROR,
        error: error
    };
};

var signup = function(name, username, password, that) {
    var payload = {
        username: username,
        password: password,
        name: name
    };
    return function(dispatch) {
        redirect = that.props.history;
        var url = '/user';
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),     
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return dispatch(signupSuccess(data));
        })
        .catch(function(error) {
            return dispatch(signupError(error));
        });
    }
};

var SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
var signupSuccess = function(data) {
    redirect.replace('/user');
    redirect = false;
    return {
        type: SIGNUP_SUCCESS,
        data: data
    };
};

var SIGNUP_ERROR = 'SIGNUP_ERROR';
var signupError = function(error) {
    redirect = false;
    return {
        type: SIGNUP_ERROR,
        error: error
    };
};

exports.getUserName = getUserName;
exports.GET_USER_NAME_SUCCESS = GET_USER_NAME_SUCCESS;
exports.getUserNameSuccess = getUserNameSuccess;
exports.GET_USER_NAME_ERROR = GET_USER_NAME_ERROR;
exports.getUserNameError = getUserNameError;
exports.login = login;
exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.loginSuccess = loginSuccess;
exports.LOGIN_ERROR = LOGIN_ERROR;
exports.loginError = loginError;
exports.signup = signup;
exports.SIGNUP_SUCCESS = SIGNUP_SUCCESS;
exports.signupSuccess = signupSuccess;
exports.SIGNUP_ERROR = SIGNUP_ERROR;
exports.signupError = signupError;