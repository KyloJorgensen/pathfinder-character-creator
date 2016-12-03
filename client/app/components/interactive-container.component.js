'use strict';

module.exports =function(label) {
    var React = require('react'),
        connect = require('react-redux').connect,
        interactiveActions = require('../actions/interactive.actions')[label],
        InteractiveList = require('./interactive-list.component')(label);

    var InteractiveContainer = React.createClass({
        componentDidMount: function() {
            this.props.dispatch(interactiveActions.getAll(this.props._characterId));
        },
        render: function() {
            if (this.props.updated) {
                this.props.dispatch(interactiveActions.getAll(this.props._characterId));
            }
            var className = label + '-container interactive'
            return (
                <div className={className}>
                    <p>{label}</p>
                    <InteractiveList _characterId={this.props._characterId}/>
                </div>
            );
        }
    });

    var mapStateToProps = function(state, props) {
        return {
            updated: state[label].updated
        };
    };

    var Container = connect(mapStateToProps)(InteractiveContainer);

    return Container;
};