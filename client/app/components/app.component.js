'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    Nav = require('./nav.component'),
    navActions = require('../actions/nav.actions'),
    userActions = require('../actions/user.actions');


var App = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(userActions.getUserName());
    },
    handleClick: function() {
        if (!this.props.overMenu && this.props.menuDisplay == 'block') {
            this.props.dispatch(navActions.menuDisplay(false));
        }
    },
    render: function() {
        return (
            <div className="pathfinder-character-creator" onClick={this.handleClick}>
                <Nav />
                <div className="pathfinder-character-creator-body">
                    {this.props.children}
                </div>
                <footer></footer>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        bodyClicked: state.nav.bodyClicked,
        overMenu: state.nav.overMenu,
        menuDisplay: state.nav.menuDisplay
    };
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;