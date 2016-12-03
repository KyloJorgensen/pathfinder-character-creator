'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link;

var mainPage = React.createClass({
	render: function() {
		if (this.props.name) {
			return (
			    <nav className="nav-bar">
			    	<div id="logo" className="container">
				        <h1>Pathfinder Character Creator</h1>
				    </div>

			    	<div id="menu">
			    		<ul>
				        	<li>
								<a>{this.props.name}</a>
							</li>
							<li>
				        		<Link to={'/user'}>CHARACTERS</Link>
							</li>
							<li>
								<a href="/logout" >LOGOUT</a>
			    			</li>
			    		</ul>
					</div>
			    </nav>
			);
		}	
		return (
		    <nav className="nav-bar">
		    	<div id="logo" className="container">
			        <h1>Pathfinder Character Creator</h1>
			    </div>
			    <div id="menu">
			    	<div className="container">
				        <ul>
				        	<li>
								<Link to={'/login'}>LOGIN</Link>
							</li>
							<li>
								<Link to={'/signup'}>SIGNUP</Link>
			    			</li>
			    		</ul>
			    	</div>
		    	</div>
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