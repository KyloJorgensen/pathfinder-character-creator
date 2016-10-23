'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    userActions = require('../actions/user.actions'),
    characterActions = require('../actions/character.actions');


var App = React.createClass({
    render: function() {
        return (
            <div className="pathfinder-character-creator">
                <div className="pathfinder-character-creator-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;