'use strict';

module.exports = function(label) {
    var React = require('react'),
        connect = require('react-redux').connect,
        interactiveActions = require('../actions/interactive.actions')[label];

    var Interactive = React.createClass({
        editField: function(that) {
            var state = this.state;
            state[that.target.name] = that.target.value;
            this.setState(state);
        },
        hitkey: function(event) {
            if (event.key == 'Enter') {
                this.saveInteractive();
            }
        },
        saveInteractive: function() {
            if (this.state.name == '') {
                this.props.dispatch(interactiveActions.remove(this.props.interactive._id, this.props.interactive._characterId));
            } else {
                this.props.dispatch(interactiveActions.update(this.state, this.props.interactive));
            }
        },
        componentWillMount: function() {
            this.setState(this.props.interactive);
        },
        render: function() {
            var state = this.state;
            var keys = Object.keys(state);
            var items = [];
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] != '_id' && keys[i] != '_characterId' && keys[i] != '_userId' && keys[i] != '__v') {
                    keys[i]
                    items.push(<input type="text" onKeyPress={this.hitkey} onChange={this.editField} onBlur={this.saveInteractive} name={keys[i]} value={this.state[keys[i]]} />)
                }
            }
            return (
                <li className={label}>
                    {items}
                </li>
            );
        }
    });

    var Container = connect()(Interactive);

    return Container;
};