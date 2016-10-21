'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	userActions = require('../actions/user.actions'),
	Link = require('react-router').Link;

var mainPage = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		if (this.refs.username.value == '') {
			return alert('Username Field Required');
		}
		if (this.refs.password.value == '') {
			return alert('Password Field Required');
		}
		this.props.dispatch(userActions.login(this.refs.username.value, this.refs.password.value, this));
		this.refs.username.value = '';
    	this.refs.password.value = '';
	},
	componentWillUnmount: function() {
		this.refs.username.value = '';
    	this.refs.password.value = '';
	},
	render: function() {
		if (this.props.loginFailed) {
			alert('Invaild Username and Password')
		}
		return (
			<div className="login">
		   		<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
				    <div>
				        <label>Username:</label>
				        <input type="text" ref="username" name="username"/>
				    </div>
				    <div>
				        <label>Password:</label>
				        <input type="password" ref="password" name="password"/>
				    </div>
				    <div>
				        <input type="submit" value="LOGIN"/>
				        <Link to={'/signup'}>SIGNUP</Link>
				    </div>
				</form>
		    </div>
		);
	}
});


var mapStateToProps = function(state, props) {
    return {
    	loginFailed: state.user.loginFailed
    };
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;