'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    Nav = require('./nav.component');


var App = React.createClass({
    render: function() {
        return (
            <div className="pathfinder-character-creator">
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
    return {};
};

var Container = connect(mapStateToProps)(App);

module.exports = Container;