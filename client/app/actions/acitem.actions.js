'use strict';

var fetch = require('isomorphic-fetch');

var getAcitems = function(_characterId) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: GET_ACITEMS_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: GET_ACITEMS_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: GET_ACITEMS_ERROR,
            error: error
        };
    }    
    return function(dispatch) {
        var url = '/acitem/' + _characterId;
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
            return dispatch(getAcitemsSuccess(data));
        })
        .catch(function(error) {
            return dispatch(getAcitemsError(error));
        });
    }
};

var GET_ACITEMS_SUCCESS = 'GET_ACITEMS_SUCCESS';
var getAcitemsSuccess = function(data) {
    return {
        type: GET_ACITEMS_SUCCESS,
        feats: data
    };
};

var GET_ACITEMS_ERROR = 'GET_ACITEMS_ERROR';
var getAcitemsError = function(error) {
    return {
        type: GET_ACITEMS_ERROR,
        error: error
    };
};

var createAcitem = function(_characterId, name) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: CREATE_ACITEM_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: CREATE_ACITEM_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: CREATE_ACITEM_ERROR,
            error: error
        };
    }
    var data = {};
    data.name = name;
    data._characterId = _characterId;
    return function(dispatch) {
        var url = '/acitem';
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
            return dispatch(createAcitemSuccess());
        })
        .catch(function(error) {
            return dispatch(createAcitemError(error));
        });
    }
};

var CREATE_ACITEM_SUCCESS = 'CREATE_ACITEM_SUCCESS';
var createAcitemSuccess = function() {
    return {
        type: CREATE_ACITEM_SUCCESS
    };
};

var CREATE_ACITEM_ERROR = 'CREATE_ACITEM_ERROR';
var createAcitemError = function(error) {
    return {
        type: CREATE_ACITEM_ERROR,
        error: error
    };
};

var deleteAcitem = function(_id, _characterId) {
        console.log('delete')
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: DELETE_ACITEM_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: DELETE_ACITEM_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: DELETE_ACITEM_ERROR,
            error: error
        };
    }

    var data = {
        _id: _id,
        _characterId: _characterId
    };
    return function(dispatch) {
        var url = '/acitem';
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
            return dispatch(deleteAcitemSuccess());
        })
        .catch(function(error) {
            return dispatch(deleteAcitemError(error));
        });
    }
};

var DELETE_ACITEM_SUCCESS = 'DELETE_ACITEM_SUCCESS';
var deleteAcitemSuccess = function(data) {
    return {
        type: DELETE_ACITEM_SUCCESS
    };
};

var DELETE_ACITEM_ERROR = 'DELETE_ACITEM_ERROR';
var deleteAcitemError = function(error) {
    redirect = false;
    return {
        type: DELETE_ACITEM_ERROR,
        error: error
    };
};

var updateAcitem = function(_new, _old) {
    if (!'cookie' in document) {
        var error = new Error('cookie is missing');
        return {
            type: UPDATE_ACITEM_ERROR,
            error: error
        };
    }
    var userKey = document.cookie.split('=');
    if (userKey[0] != 'UserKey') {
        var error = new Error('UserKey cookie is missing');
        return {
            type: UPDATE_ACITEM_ERROR,
            error: error
        };
    }
    if (userKey[1] == 'null') {
        var error = new Error('UserKey cookie is null');
        return {
            type: UPDATE_ACITEM_ERROR,
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
        var url = '/acitem';
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
            return dispatch(updateAcitemSuccess(data));
        })
        .catch(function(error) {
            return dispatch(updateAcitemError(error));
        });
    }
};

var UPDATE_ACITEM_SUCCESS = 'UPDATE_ACITEM_SUCCESS';
var updateAcitemSuccess = function(data) {
    return {
        type: UPDATE_ACITEM_SUCCESS
    };
};

var UPDATE_ACITEM_ERROR = 'UPDATE_ACITEM_ERROR';
var updateAcitemError = function(error) {
    return {
        type: UPDATE_ACITEM_ERROR,
        error: error
    };
};

exports.getAcitems = getAcitems;
exports.GET_ACITEMS_SUCCESS = GET_ACITEMS_SUCCESS;
exports.getAcitemsSuccess = getAcitemsSuccess;
exports.GET_ACITEMS_ERROR = GET_ACITEMS_ERROR;
exports.getAcitemsError = getAcitemsError;
exports.createAcitem = createAcitem
exports.CREATE_ACITEM_SUCCESS = CREATE_ACITEM_SUCCESS;
exports.createAcitemSuccess = createAcitemSuccess;
exports.CREATE_ACITEM_ERROR = CREATE_ACITEM_ERROR;
exports.createAcitemError = createAcitemError;
exports.deleteAcitem = deleteAcitem
exports.DELETE_ACITEM_SUCCESS = DELETE_ACITEM_SUCCESS;
exports.deleteAcitemSuccess = deleteAcitemSuccess;
exports.DELETE_ACITEM_ERROR = DELETE_ACITEM_ERROR;
exports.deleteAcitemError = deleteAcitemError;
exports.updateAcitem = updateAcitem
exports.UPDATE_ACITEM_SUCCESS = UPDATE_ACITEM_SUCCESS;
exports.updateAcitemSuccess = updateAcitemSuccess;
exports.UPDATE_ACITEM_ERROR = UPDATE_ACITEM_ERROR;
exports.updateAcitemError = updateAcitemError;