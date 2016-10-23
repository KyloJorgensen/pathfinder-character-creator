'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	userActions = require('../actions/user.actions'),
	characterActions = require('../actions/character.actions'),
	Nav = require('../components/nav.component'),
	CharacterName = require('../components/character-name.component'),
	CreateCharacter = require('../components/create-character.component');

var mainPage = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(userActions.getUserName(this.props.history));
        this.props.dispatch(characterActions.getListOfCharacters());
	},
	render: function() {
		var characters = [];
		for (var i = 0; i < this.props.listOfCharacters.length; i++) {
			this.props.listOfCharacters[i]
			characters.push(<CharacterName link={this.props.history} name={this.props.listOfCharacters[i].name} _id={this.props.listOfCharacters[i]._id} />);
		}
		if (!'cookie' in document) {
			this.props.history.replace('/');
	    }
	    var userKey = document.cookie.split('=');
	    if (userKey[0] != 'UserKey') {
			this.props.history.replace('/');
	    }
	    if (userKey[1] == 'null') {
			this.props.history.replace('/');
	    }
		return (
		    <div className="user-page">
		    	<Nav />
		    	<h1>Characters</h1>
		    	<ul>
					{characters}
		    	</ul>
		    	<CreateCharacter link={this.props.history} />
		    </div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    	listOfCharacters: state.character.listOfCharacters
    };
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;