'use strict';

var React = require('react'),
	connect = require('react-redux').connect;

var mainPage = React.createClass({
	render: function() {		
		return (
		    <div className="main-page">
		        <h1>Hello, Welcome to Pathfinder Character Creator.</h1>
				<form action="/logout" method="get">
				    <div>
				        <input type="submit" value="LogOut"/>
				    </div>
				</form>
				<form action="/#/login" method="get">
				    <div>
				        <input type="submit" value="login"/>
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