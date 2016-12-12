'use strict';

var React = require('react'),
	connect = require('react-redux').connect,
	Link = require('react-router').Link, 
	navActions = require('../actions/nav.actions');

var mainPage = React.createClass({
	getInitialState: function() {
		var state = {
			menuDisplay: 'none'
		};
		return state;
	},
	activeMenu: function() {
		console.log('click');
		var _state = this.state;
		_state.menuDisplay = 'block';
		this.setState(_state);

	},
	changeMenuActivity: function() {
		if (this.state.menuDisplay == 'none') {
			// this.activeMenu();
			this.props.dispatch(navActions.menuDisplay(true));
		}
	},
	hoverOnMenu: function() {
		this.props.dispatch(navActions.overMenu(true));
	},
	hoverOffMenu: function() {
		this.props.dispatch(navActions.overMenu(false));
	},
	render: function() {
		var menuStyle = {
			display: this.props.menuDisplay
		};	

		if (this.props.name) {
			return (
				<nav className="nav-bar">
					<div id="logo" >
						<h1>Pathfinder Character Creator</h1>
					</div>

					<div id="nav-pop-down" onMouseEnter={this.hoverOnMenu} onMouseLeave={this.hoverOffMenu} >
						<p><span onClick={this.changeMenuActivity} >Menu</span> <i className="fa fa-bars" aria-hidden="true"></i></p>
						<ul style={menuStyle}>
							<li className="current-user">
								<p>Signed is as</p>
								<a><strong>{this.props.name}</strong></a>
							</li>
							<li>
								<Link to={'/'}>Main</Link>
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
				<div id="logo">
					<h1>Pathfinder Character Creator</h1>
				</div>
				<div id="nav-pop-down" onMouseEnter={this.hoverOnMenu} onMouseLeave={this.hoverOffMenu} >
					<p><span onClick={this.changeMenuActivity} >Menu</span> <i className="fa fa-bars" aria-hidden="true"></i></p>
					<ul style={menuStyle} >
						<li>
							<Link to={'/'}>Main</Link>
						</li>			
						<li>
							<Link to={'/login'}>LOGIN</Link>
						</li>

						<li>
							<Link to={'/signup'}>SIGNUP</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
});


var mapStateToProps = function(state, props) {
	return {
		name: state.user.name,
		bodyClicked: state.nav.bodyClicked,
		overMenu: state.nav.overMenu,
		menuDisplay: state.nav.menuDisplay
	};
};

var Container = connect(mapStateToProps)(mainPage);

module.exports = Container;