'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    characterActions = require('../actions/character.actions');

var characterName = React.createClass({
    onCharacter: function() {
        this.props.link.replace('/character/' + this.props._id);
    },
    render: function() {
        return (
            <li className="character-name">
                <button onClick={this.onCharacter} >{this.props.name}</button>
            </li>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {};
};

var Container = connect(mapStateToProps)(characterName);

module.exports = Container;