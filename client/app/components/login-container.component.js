'use strict';

var React = require('react'),
    connect = require('react-redux').connect;


var LoginContainer = function(props) {
    if ('cookie' in document) {
        var userKey = document.cookie.split('=');
        if (userKey[0] == 'UserKey') {
            if (userKey[1] != 'null') {
                props.history.replace('/user');
            } 
        }
    }
    return (
        <div className="login-page">
            <div className="login-page-body">
                {props.children}
            </div>
        </div>
    );
};

var mapStateToProps = function(state, props) {
    return {
        name: state.user.name
    };
};

var Container = connect(mapStateToProps)(LoginContainer);

module.exports = Container;