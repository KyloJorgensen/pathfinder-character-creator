'use strict';

module.exports = function(label) {
    var React = require('react'),
        connect = require('react-redux').connect,
        interactiveActions = require('../actions/interactive.actions')[label],
        Interactive = require('./interactive.component.js')(label);

    var InteractiveList = React.createClass({
        addInteractive: function() {
            if (this.refs.newItem.value) {
                this.props.dispatch(interactiveActions.create(this.props._characterId, this.refs.newItem.value));
                this.refs.newItem.value = '';
            }
        },
        hitkey: function(event) {
            if (event.key == 'Enter') {
                this.addInteractive();
            }
        },
        render: function() {
            var interactives = [];
            for (var i = 0; i < this.props.interactives.length; i++) {
                interactives.push(<Interactive key={i} interactive={this.props.interactives[i]} />);
            }
            interactives.push(<li><input type="text" onKeyPress={this.hitkey} onBlur={this.addInteractive} name="newItem" ref="newItem" placeholder="ADD NEW" /></li>);
            var className = label + '-list';
            return (
                <ul className={className}>
                    {interactives}
                </ul>
            );
        }
    });

    var mapStateToProps = function(state, props) {
        return {
            interactives: state[label][label]
        };
    };

    var Container = connect(mapStateToProps)(InteractiveList);

    return Container;
};