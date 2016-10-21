'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    featActions = require('../actions/feat.actions'),
    FeatList = require('./feat-list.component');

var FeatContainer = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(featActions.getFeats(this.props._characterId));
    },
    render: function() {
        if (this.props.updated) {
            this.props.dispatch(featActions.getFeats(this.props._characterId));
        }
        return (
            <div className="feat-container">
                <FeatList _characterId={this.props._characterId}/>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        updated: state.feat.updated
    };
};

var Container = connect(mapStateToProps)(FeatContainer);

module.exports = Container;