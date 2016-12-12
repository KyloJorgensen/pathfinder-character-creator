'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Nav = require('../components/nav.component'),
	navActions = require('../actions/nav.actions');

var mainPage = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(navActions.menuDisplay(false));
	},
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
		    <div className="main-page-wrapper">
		    	<div className="main-page">
		    		<div id="banner">
			    		<div>
				    		<img src="/banner.jpg" />
					    </div>
				    </div>
				    <div id="main">
			    		<div className="container">
			    			<div>
			    				<div>
						        	<h1>Welcome to Pathfinder Character Creator.</h1>
						        	<p>Pathfinder Character Creator is a place to make, edit, and save your characters for Pathfinder a Role Playing Game made by Paizo Publishing.</p>
						        	<p>Login or Signup to start using creating today.</p>
				        		</div>
				        	</div>
				        </div>
				    </div>
				</div>

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