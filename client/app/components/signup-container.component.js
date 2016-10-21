'use strict';

var React = require('react'),
    connect = require('react-redux').connect;

var SignupContainer = React.createClass({     
    render: function() {
        if ('cookie' in document) {
            var userKey = document.cookie.split('=');
            if (userKey[0] == 'UserKey') {
                if (userKey[1] != 'null') {
                    this.props.history.replace('/user');
                } 
            }
        }
        return (
            <div className="signup-page">
                <div className="signup-page-body">
                    {this.props.children}
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

var Container = connect(mapStateToProps)(SignupContainer);

module.exports = Container;