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
            if (this.props.interactives[0]) {
                var keys = Object.keys(this.props.interactives[0]);
                var items = [];
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] != '_id' && keys[i] != '_characterId' && keys[i] != '_userId' && keys[i] != '__v') {
                        items.push(<th>{keys[i]}</th>);
                    }
                }
                interactives.push(items);
            }
            for (var i = 0; i < this.props.interactives.length; i++) {
                interactives.push(<Interactive key={i} interactiveNumber={i}/>);
            }
            interactives.push(<tr><td><input type="text" onKeyPress={this.hitkey} onBlur={this.addInteractive} name="newItem" ref="newItem" placeholder="ADD NEW" /></td></tr>);
            var className = label + '-list';
            return (
                <table className={className}>
                    {interactives}
                </table>
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