'use strict';

var React = require('react'),
	connect = require('react-redux').connect;

var mainPage = React.createClass({
	render: function() {		
		return (
		    <div className="login">
		   		<h1>Login</h1>
				<form action="/login" method="post">
				    <div>
				        <label>Username:</label>
				        <input type="text" name="username"/>
				    </div>
				    <div>
				        <label>Password:</label>
				        <input type="password" name="password"/>
				    </div>
				    <div>
				        <input type="submit" value="Log In"/>
				    </div>
				</form>
		    </div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    };
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;