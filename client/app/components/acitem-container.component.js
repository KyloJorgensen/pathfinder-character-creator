'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    acitemActions = require('../actions/acitem.actions'),
    AcitemList = require('./acitem-list.component');

var AcitemContainer = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(acitemActions.getAcitems(this.props._characterId));
    },
    render: function() {
        if (this.props.updated) {
            console.log('asdf')
            this.props.dispatch(acitemActions.getAcitems(this.props._characterId));
        }
        return (
            <div className="acitem-container">
                <AcitemList _characterId={this.props._characterId}/>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        updated: state.acitem.updated
    };
};

var Container = connect(mapStateToProps)(AcitemContainer);

module.exports = Container;