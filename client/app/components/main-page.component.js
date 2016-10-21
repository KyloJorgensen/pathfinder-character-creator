'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Nav = require('../components/nav.component');

var mainPage = React.createClass({
	render: function() {
        if (!'cookie' in document) {
	        var userKey = document.cookie.split('=');
	        if (userKey[0] == 'UserKey') {
		        if (userKey[1] != 'null') {
		            props.history.replace('/user');
		        } 
	        }
        }
  		
		return (
		    <div className="main-page">
		    	<Nav />
		        <h1>Welcome to Pathfinder Character Creator.</h1>
		        <p>Pathfinder Character Creator is a place to make, edit, and save your characters for pathfinder.</p>
		    </div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    	name: state.user.name
    };
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;