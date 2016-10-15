'use strict';

var React = require('react'),
    connect = require('react-redux').connect;


var App = function(props) {
    return (
        <div className="pathfinder-character-creator">
            <div className="pathfinder-character-creator-body">
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