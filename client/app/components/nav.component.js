'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var mainPage = React.createClass({
	render: function() {
		if (this.props.name) {
			return (
			    <nav className="nav-bar">
			    	<h1>Pathfinder Character Creator</h1>
			    	<p>{this.props.name}</p>
			        <Link to={'/user'}>CHARACTERS</Link>
					<form action="/logout" method="get">
					    <input type="submit" value="LogOut"/>
					</form>
			    </nav>
			);
		}	
		return (
		    <nav className="nav-bar">
		        <h1>Pathfinder Character Creator</h1>
				<Link to={'/login'}>LOGIN</Link>
				<Link to={'/signup'}>SIGNUP</Link>
		    </nav>
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