'use strict';

var fetch = require('isomorphic-fetch');

var getFeats = function(_characterId) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: GET_FEATS_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: GET_FEATS_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: GET_FEATS_ERROR,
            error: error
        };
    }    
    return function(dispatch) {
        var url = '/feat/' + _characterId;
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
            return dispatch(getFeatsSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getFeatsError(error));
        });
    }
};

var GET_FEATS_SUCCESS = 'GET_FEATS_SUCCESS';
var getFeatsSuccess = function(data) {
    return {
        type: GET_FEATS_SUCCESS,
        feats: data
    };
};

var GET_FEATS_ERROR = 'GET_FEATS_ERROR';
var getFeatsError = function(error) {
    return {
        type: GET_FEATS_ERROR,
        error: error
    };
};

var createFeat = function(_characterId, name) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: CREATE_FEAT_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: CREATE_FEAT_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: CREATE_FEAT_ERROR,
            error: error
        };
    }
    var data = {};
    data.name = name;
    data._characterId = _characterId;
    return function(dispatch) {
        var url = '/feat';
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
            return dispatch(createFeatSuccess());
        })
        .catch(function(error) {
            return dispatch(createFeatError(error));
        });
    }
};

var CREATE_FEAT_SUCCESS = 'CREATE_FEAT_SUCCESS';
var createFeatSuccess = function() {
    return {
        type: CREATE_FEAT_SUCCESS
    };
};

var CREATE_FEAT_ERROR = 'CREATE_FEAT_ERROR';
var createFeatError = function(error) {
    return {
        type: CREATE_FEAT_ERROR,
        error: error
    };
};

var deleteFeat = function(_id, _characterId) {
        console.log('delete')
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: DELETE_FEAT_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: DELETE_FEAT_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: DELETE_FEAT_ERROR,
            error: error
        };
    }

    var data = {
        _id: _id,
        _characterId: _characterId
    };
    return function(dispatch) {
        var url = '/feat';
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
            return dispatch(deleteFeatSuccess());
        })
        .catch(function(error) {
            return dispatch(deleteFeatError(error));
        });
    }
};

var DELETE_FEAT_SUCCESS = 'DELETE_FEAT_SUCCESS';
var deleteFeatSuccess = function(data) {
    return {
        type: DELETE_FEAT_SUCCESS
    };
};

var DELETE_FEAT_ERROR = 'DELETE_FEAT_ERROR';
var deleteFeatError = function(error) {
    redirect = false;
    return {
        type: DELETE_FEAT_ERROR,
        error: error
    };
};

var updateFeat = function(_new, _old) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: UPDATE_FEAT_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: UPDATE_FEAT_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: UPDATE_FEAT_ERROR,
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
        var url = '/feat';
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
            return dispatch(updateFeatSuccess(data));
        })
        .catch(function(error) {
            return dispatch(updateFeatError(error));
        });
    }
};

var UPDATE_FEAT_SUCCESS = 'UPDATE_FEAT_SUCCESS';
var updateFeatSuccess = function(data) {
    return {
        type: UPDATE_FEAT_SUCCESS
    };
};

var UPDATE_FEAT_ERROR = 'UPDATE_FEAT_ERROR';
var updateFeatError = function(error) {
    return {
        type: UPDATE_FEAT_ERROR,
        error: error
    };
};

exports.getFeats = getFeats;
exports.GET_FEATS_SUCCESS = GET_FEATS_SUCCESS;
exports.getFeatsSuccess = getFeatsSuccess;
exports.GET_FEATS_ERROR = GET_FEATS_ERROR;
exports.getFeatsError = getFeatsError;
exports.createFeat = createFeat
exports.CREATE_FEAT_SUCCESS = CREATE_FEAT_SUCCESS;
exports.createFeatSuccess = createFeatSuccess;
exports.CREATE_FEAT_ERROR = CREATE_FEAT_ERROR;
exports.createFeatError = createFeatError;
exports.deleteFeat = deleteFeat
exports.DELETE_FEAT_SUCCESS = DELETE_FEAT_SUCCESS;
exports.deleteFeatSuccess = deleteFeatSuccess;
exports.DELETE_FEAT_ERROR = DELETE_FEAT_ERROR;
exports.deleteFeatError = deleteFeatError;
exports.updateFeat = updateFeat
exports.UPDATE_FEAT_SUCCESS = UPDATE_FEAT_SUCCESS;
exports.updateFeatSuccess = updateFeatSuccess;
exports.UPDATE_FEAT_ERROR = UPDATE_FEAT_ERROR;
exports.updateFeatError = updateFeatError;