'use strict';

var React = require('react'),
    connect = require('react-redux').connect;


var App = function(props) {
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
    };
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;