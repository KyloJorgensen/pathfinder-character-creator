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
		    <div className="main-page-wrapper">
		    	<Nav />
		    	<div className="main-page">
		    		<div id="banner">
			    		<div className="container">
			    			<div>
				    			<img src="/871506.jpg" />
					    	</div>
				    	</div>
				    </div>
				    <div id="main">
			    		<div className="container">
			    			<div>
			    				<div>
						        	<h1>Welcome to Pathfinder Character Creator.</h1>
						        	<p>Pathfinder Character Creator is a place to make, edit, and save your characters for pathfinder.</p>
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