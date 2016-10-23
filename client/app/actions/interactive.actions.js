'use strict';

var interactives = require('../interactives');

var actions = function(label) {
    var fetch = require('isomorphic-fetch');

    var get = function(_characterId) {
        if (!'cookie' in document) {
            var error = new Error('cookie is missing');
            return {
                type: GET_ERROR,
                error: error
            };
        }
        var userKey = document.cookie.split('=');
        if (userKey[0] != 'UserKey') {
            var error = new Error('UserKey cookie is missing');
            return {
                type: GET_ERROR,
                error: error
            };
        }
        if (userKey[1] == 'null') {
            var error = new Error('UserKey cookie is null');
            return {
                type: GET_ERROR,
                error: error
            };
        }    
        return function(dispatch) {
            var url = '/' + label + '/' + _characterId;
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
                return dispatch(getSuccess(data));
            })
            .catch(function(error) {
                return dispatch(getError(error));
            });
        }
    };

    var GET_SUCCESS = 'GET_SUCCESS' + label;
    var getSuccess = function(data) {
        return {
            type: GET_SUCCESS,
            data: data
        };
    };

    var GET_ERROR = 'GET_ERROR' + label;
    var getError = function(error) {
        return {
            type: GET_ERROR,
            error: error
        };
    };

    var create = function(_characterId, name) {
        if (!'cookie' in document) {
            var error = new Error('cookie is missing');
            return {
                type: CREATE_ERROR,
                error: error
            };
        }
        var userKey = document.cookie.split('=');
        if (userKey[0] != 'UserKey') {
            var error = new Error('UserKey cookie is missing');
            return {
                type: CREATE_ERROR,
                error: error
            };
        }
        if (userKey[1] == 'null') {
            var error = new Error('UserKey cookie is null');
            return {
                type: CREATE_ERROR,
                error: error
            };
        }
        var data = {};
        data.name = name;
        data._characterId = _characterId;
        return function(dispatch) {
            var url = '/' + label;
            return fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': document.cookie
                },
                body: JSON.stringify(data),  
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
                return dispatch(createSuccess());
            })
            .catch(function(error) {
                return dispatch(createError(error));
            });
        }
    };

    var CREATE_SUCCESS = 'CREATE_SUCCESS' + label;
    var createSuccess = function() {
        return {
            type: CREATE_SUCCESS
        };
    };

    var CREATE_ERROR = 'CREATE_ERROR' + label;
    var createError = function(error) {
        return {
            type: CREATE_ERROR,
            error: error
        };
    };

    var remove = function(_id, _characterId) {
        if (!'cookie' in document) {
            var error = new Error('cookie is missing');
            return {
                type: REMOVE_ERROR,
                error: error
            };
        }
        var userKey = document.cookie.split('=');
        if (userKey[0] != 'UserKey') {
            var error = new Error('UserKey cookie is missing');
            return {
                type: REMOVE_ERROR,
                error: error
            };
        }
        if (userKey[1] == 'null') {
            var error = new Error('UserKey cookie is null');
            return {
                type: REMOVE_ERROR,
                error: error
            };
        }

        var data = {
            _id: _id,
            _characterId: _characterId
        };
        return function(dispatch) {
            var url = '/' + label;
            return fetch(url, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': document.cookie
                },
                body: JSON.stringify(data),  
            }).then(function(response) {
                if (response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText)
                    error.response = response
                    throw error;
                }
                return response;
            })
            .then(function() {
                return dispatch(removeSuccess());
            })
            .catch(function(error) {
                return dispatch(removeError(error));
            });
        }
    };

    var REMOVE_SUCCESS = 'REMOVE_SUCCESS' + label;
    var removeSuccess = function(data) {
        return {
            type: REMOVE_SUCCESS
        };
    };

    var REMOVE_ERROR = 'REMOVE_ERROR' + label;
    var removeError = function(error) {
        redirect = false;
        return {
            type: REMOVE_ERROR,
            error: error
        };
    };

    var update = function(_new, _old) {
        if (!'cookie' in document) {
            var error = new Error('cookie is missing');
            return {
                type: UPDATE_ERROR,
                error: error
            };
        }
        var userKey = document.cookie.split('=');
        if (userKey[0] != 'UserKey') {
            var error = new Error('UserKey cookie is missing');
            return {
                type: UPDATE_ERROR,
                error: error
            };
        }
        if (userKey[1] == 'null') {
            var error = new Error('UserKey cookie is null');
            return {
                type: UPDATE_ERROR,
                error: error
            };
        }
        var data = {
            _id: _new._id,
            _characterId: _new._characterId
        };

        var _newKeys = Object.keys(_new);
        for (var i = 0; i < _newKeys.length; i++) {
            if (_new[_newKeys[i]] != _old[_newKeys[i]]) {
                data[_newKeys[i]] = _new[_newKeys[i]];
            }
        }

        return function(dispatch) {
            var url = '/' + label;
            return fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authentication': document.cookie
                },
                body: JSON.stringify(data),  
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
                return dispatch(updateSuccess(data));
            })
            .catch(function(error) {
                return dispatch(updateError(error));
            });
        }
    };

    var UPDATE_SUCCESS = 'UPDATE_SUCCESS' + label;
    var updateSuccess = function(data) {
        return {
            type: UPDATE_SUCCESS
        };
    };

    var UPDATE_ERROR = 'UPDATE_ERROR' + label;
    var updateError = function(error) {
        return {
            type: UPDATE_ERROR,
            error: error
        };
    };

    var actions = {};
    actions.get = get;
    actions.GET_SUCCESS = GET_SUCCESS;
    actions.getSuccess = getSuccess;
    actions.GET_ERROR = GET_ERROR;
    actions.getError = getError;
    actions.create = create
    actions.CREATE_SUCCESS = CREATE_SUCCESS;
    actions.createSuccess = createSuccess;
    actions.CREATE_ERROR = CREATE_ERROR;
    actions.createError = createError;
    actions.remove = remove
    actions.REMOVE_SUCCESS = REMOVE_SUCCESS;
    actions.removeSuccess = removeSuccess;
    actions.REMOVE_ERROR = REMOVE_ERROR;
    actions.removeError = removeError;
    actions.update = update
    actions.UPDATE_SUCCESS = UPDATE_SUCCESS;
    actions.updateSuccess = updateSuccess;
    actions.UPDATE_ERROR = UPDATE_ERROR;
    actions.updateError = updateError;

    return actions;
};
var keys = Object.keys(interactives);
var _actions = {};
for (var i = 0; i < keys.length; i++) {
    var label = interactives[keys[i]];
    _actions[label] = actions(label);
}
module.exports = _actions;


