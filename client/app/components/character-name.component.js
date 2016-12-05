'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    characterActions = require('../actions/character.actions'),
    Link = require('react-router').Link;

var characterName = React.createClass({
    render: function() {
        return (
            <li className="character-name">
                <Link to={'/character/' + this.props.character._id }>{this.props.character.name} - {this.props.character.race} {this.props.character.class} {this.props.character.level}</Link>
            </li>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(characterName);

module.exports = Container;