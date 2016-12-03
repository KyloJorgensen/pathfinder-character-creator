'use strict';

var fetch = require('isomorphic-fetch');
var redirect = false;

var getListOfCharacters = function() {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: GET_LIST_OF_CHARACTERS_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: GET_LIST_OF_CHARACTERS_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: GET_LIST_OF_CHARACTERS_ERROR,
            error: error
        };
    }    
    return function(dispatch) {
        var url = '/character';
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
            return dispatch(getListOfCharactersSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getListOfCharactersError(error));
        });
    }
};

var GET_LIST_OF_CHARACTERS_SUCCESS = 'GET_LIST_OF_CHARACTERS_SUCCESS';
var getListOfCharactersSuccess = function(data) {
    return {
        type: GET_LIST_OF_CHARACTERS_SUCCESS,
        listOfCharacters: data
    };
};

var GET_LIST_OF_CHARACTERS_ERROR = 'GET_LIST_OF_CHARACTERS_ERROR';
var getListOfCharactersError = function(error) {
    return {
        type: GET_LIST_OF_CHARACTERS_ERROR,
        error: error
    };
};

var getCharacter = function(_id, link) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        link.replace('/user');
        return {
            type: GET_CHARACTER_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        link.replace('/user');
        return {
            type: GET_CHARACTER_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        link.replace('/user');
        return {
            type: GET_CHARACTER_ERROR,
            error: error
        };
    }    
    redirect = link;
    return function(dispatch) {
        var url = '/character/' + _id;
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
            return dispatch(getCharacterSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getCharacterError(error));
        });
    }
};

var GET_CHARACTER_SUCCESS = 'GET_CHARACTER_SUCCESS';
var getCharacterSuccess = function(data) {
    redirect = false;
    return {
        type: GET_CHARACTER_SUCCESS,
        character: data
    };
};

var GET_CHARACTER_ERROR = 'GET_CHARACTER_ERROR';
var getCharacterError = function(error) {
    redirect.replace('/user');
    redirect = false;
    return {
        type: GET_CHARACTER_ERROR,
        error: error
    };
};

var createCharacter = function(name, link) {
    redirect = link;
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: CREATE_CHARACTER_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: CREATE_CHARACTER_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: CREATE_CHARACTER_ERROR,
            error: error
        };
    }

    return function(dispatch) {
        var url = '/character';
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authentication': document.cookie
            },
            body: JSON.stringify({name: name}),  
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
            return dispatch(createCharacterSuccess(data));
        })
        .catch(function(error) {
            return dispatch(createCharacterError(error));
        });
    }
};

var CREATE_CHARACTER_SUCCESS = 'CREATE_CHARACTER_SUCCESS';
var createCharacterSuccess = function(data) {
    redirect.replace('/character/' + data._id)
    redirect = false;
    return {
        type: CREATE_CHARACTER_SUCCESS,
        character: data
    };
};

var CREATE_CHARACTER_ERROR = 'CREATE_CHARACTER_ERROR';
var createCharacterError = function(error) {
    redirect = false;
    return {
        type: CREATE_CHARACTER_ERROR,
        error: error
    };
};

var deleteCharacter = function(_characterId, link) {
    redirect = link;
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: DELETE_CHARACTER_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: DELETE_CHARACTER_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: DELETE_CHARACTER_ERROR,
            error: error
        };
    }

    return function(dispatch) {
        var url = '/character';
        return fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authentication': document.cookie
            },
            body: JSON.stringify({_characterId: _characterId}),  
        }).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function() {
            return dispatch(deleteCharacterSuccess());
        })
        .catch(function(error) {
            return dispatch(deleteCharacterError(error));
        });
    }
};

var DELETE_CHARACTER_SUCCESS = 'DELETE_CHARACTER_SUCCESS';
var deleteCharacterSuccess = function(data) {
    redirect.replace('/user')
    redirect = false;
    return {
        type: DELETE_CHARACTER_SUCCESS
    };
};

var DELETE_CHARACTER_ERROR = 'DELETE_CHARACTER_ERROR';
var deleteCharacterError = function(error) {
    redirect = false;
    return {
        type: DELETE_CHARACTER_ERROR,
        error: error
    };
};

var updateCharacter = function(_new, _old) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: UPDATE_CHARACTER_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: UPDATE_CHARACTER_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: UPDATE_CHARACTER_ERROR,
            error: error
        };
    }
    var data = {_id: _new._id};

    var _newKeys = Object.keys(_new);
    for (var i = 0; i < _newKeys.length; i++) {
        if (_new[_newKeys[i]] != _old[_newKeys[i]]) {
            data[_newKeys[i]] = _new[_newKeys[i]];
        }
    }

    return function(dispatch) {
        var url = '/character';
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
            return dispatch(updateCharacterSuccess(data));
        })
        .catch(function(error) {
            return dispatch(updateCharacterError(error));
        });
    }
};

var UPDATE_CHARACTER_SUCCESS = 'UPDATE_CHARACTER_SUCCESS';
var updateCharacterSuccess = function(data) {
    return {
        type: UPDATE_CHARACTER_SUCCESS,
        character: data
    };
};

var UPDATE_CHARACTER_ERROR = 'UPDATE_CHARACTER_ERROR';
var updateCharacterError = function(error) {
    return {
        type: UPDATE_CHARACTER_ERROR,
        error: error
    };
};

exports.getListOfCharacters = getListOfCharacters;
exports.GET_LIST_OF_CHARACTERS_SUCCESS = GET_LIST_OF_CHARACTERS_SUCCESS;
exports.getListOfCharactersSuccess = getListOfCharactersSuccess;
exports.GET_LIST_OF_CHARACTERS_ERROR = GET_LIST_OF_CHARACTERS_ERROR;
exports.getListOfCharactersError = getListOfCharactersError;
exports.getCharacter = getCharacter;
exports.GET_CHARACTER_SUCCESS = GET_CHARACTER_SUCCESS;
exports.getCharacterSuccess = getCharacterSuccess;
exports.GET_CHARACTER_ERROR = GET_CHARACTER_ERROR;
exports.getCharacterError = getCharacterError;
exports.createCharacter = createCharacter
exports.CREATE_CHARACTER_SUCCESS = CREATE_CHARACTER_SUCCESS;
exports.createCharacterSuccess = createCharacterSuccess;
exports.CREATE_CHARACTER_ERROR = CREATE_CHARACTER_ERROR;
exports.createCharacterError = createCharacterError;
exports.deleteCharacter = deleteCharacter
exports.DELETE_CHARACTER_SUCCESS = DELETE_CHARACTER_SUCCESS;
exports.deleteCharacterSuccess = deleteCharacterSuccess;
exports.DELETE_CHARACTER_ERROR = DELETE_CHARACTER_ERROR;
exports.deleteCharacterError = deleteCharacterError;
exports.updateCharacter = updateCharacter
exports.UPDATE_CHARACTER_SUCCESS = UPDATE_CHARACTER_SUCCESS;
exports.updateCharacterSuccess = updateCharacterSuccess;
exports.UPDATE_CHARACTER_ERROR = UPDATE_CHARACTER_ERROR;
exports.updateCharacterError = updateCharacterError;