'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    characterActions = require('../actions/character.actions');

var characterName = React.createClass({
    onCharacter: function() {
        this.props.link.replace('/character/' + this.props.character._id);
    },
    render: function() {
        return (
            <li className="character-name">
                <a onClick={this.onCharacter} >{this.props.character.name} - {this.props.character.class} {this.props.character.race} {this.props.character.level} </a>
            </li>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(characterName);

module.exports = Container;