'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	characterActions = require('../actions/character.actions');

var character = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		if (this.refs.name.value) {
			this.props.dispatch(characterActions.createCharacter(this.refs.name.value));
			this.refs.name.value = '';
		} else {
			alert("Name Field required.");
		}
	},
	componentWillUnmount: function() {
		this.refs.name.value = '';
	},
    hitkey: function(event) {
        if (event.key == 'Enter') {
            this.saveInteractive();
        }
    },
	render: function() {
		return (
			<div className="create-character">
			    <form onSubmit={this.handleSubmit} >
			        <label>Name:</label>
			        <input type="text" onKeyPress={this.hitkey} ref="name" name="name"/>
			        <input type="submit" value="CREATE CRARACTER" />
			    </form>
			</div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    	character: state.character.character
    };
};

var Container = connect(mapStateToProps)(character);

module.exports = Container;