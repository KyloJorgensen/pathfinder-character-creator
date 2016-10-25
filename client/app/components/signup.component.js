'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	userActions = require('../actions/user.actions'),
	Link = require('react-router').Link;

var mainPage = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		if (this.refs.name.value == '') {
			return alert('Name Field Required');
		}
		if (this.refs.username.value == '') {
			return alert('Username Field Required');
		}
		if (this.refs.password.value == '') {
			return alert('Password Field Required');
		}
		if (this.refs.confrimedPassword.value == '') {
			return alert('Confrimed Password Field Required');
		}
		if (this.refs.password.value == this.refs.confrimedPassword.value) {
			this.props.dispatch(userActions.signup(this.refs.name.value, this.refs.username.value, this.refs.password.value, this));
			this.refs.username.value = '';
    		this.refs.password.value = '';
    		this.refs.confrimedPassword.value = '';
		} else {
			this.refs.password.value = '';
			this.refs.confrimedPassword.value = '';
			alert('Passwords must match');
		}
	},
	hitKey: function(event) {
		if (event.key == 'Enter') {
            this.handleSubmit();
        }
	},
	componentWillUnmount: function() {
		this.refs.name.value = '';
		this.refs.username.value = '';
    	this.refs.password.value = '';
    	this.refs.confrimedPassword.value = '';
	},
	render: function() {
		if (this.props.signupFailed) {
			alert('invaild username');
		}
		var component = (
			<div className="signup">
		   		<h1>Signup</h1>
				<div>
					<div>
				        <label>Name:</label>
				        <input type="text" onKeyPress={this.hitkey} ref="name" name="name"/>
				    </div>
				    <div>
				        <label>Username:</label>
				        <input type="text" onKeyPress={this.hitkey} ref="username" name="username"/>
				    </div>
				    <div>
				        <label>Password:</label>
				        <input type="password" onKeyPress={this.hitkey} ref="password" name="password"/>
				    </div>
				    <div>
				        <label>Confrim:</label>
				        <input type="password" onKeyPress={this.hitkey} ref="confrimedPassword" name="confrimedPassword"/>
				    </div>
				    <a onClick={this.handleSubmit} >SIGNUP</a>
				    <Link to={'/login'}>LOGIN</Link>
				</div>
		    </div>					
		);
		
		return component;
	}
});


var mapStateToProps = function(state, props) {
    return {
    	signupFailed: state.user.signupFailed
    };
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;