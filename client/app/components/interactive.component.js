'use strict';
var focus = false;
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
            if (this.state.name != '' && !focus) {
                this.props.dispatch(interactiveActions.update(this.state, this.props.interactive));
            } else {
                setTimeout(this.saveInteractive, 3000);
            }
        },
        deleteItem: function() {
            this.props.dispatch(interactiveActions.remove(this.props.interactive._id, this.props.interactive._characterId));
        },
        componentWillMount: function() {
            this.setState(this.props.interactive);
        },
        focus: false,
        focusOn: function(event) {
            event.target.select();
            focus = true;
        },
        focusOff: function() {
            setTimeout(this.saveInteractive, 1000);
            focus = false;
        },
        render: function() {
            var state = this.state;
            var keys = Object.keys(state);
            var items = [];
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] != '_id' && keys[i] != '_characterId' && keys[i] != '_userId' && keys[i] != '__v') {
                    if (typeof this.props.interactive[keys[i]] == 'number') {
                        items.push(<td><input type="number" inputmode="numeric" pattern="[0-9]*" onFocus={this.focusOn} onKeyPress={this.hitkey} onChange={this.editField} onBlur={this.focusOff} name={keys[i]} value={this.state[keys[i]]} /></td>);
                    } else {
                        items.push(<td><input type={type}  onFocus={this.focusOn} onKeyPress={this.hitkey} onChange={this.editField} onBlur={this.focusOff} name={keys[i]} value={this.state[keys[i]]} /></td>);
                    }
                }
            }
            items.push(<button onClick={this.deleteItem} >DELETE</button>);
            return (
                <tr className={label}>
                    {items}
                </tr>
            );
        }
    });

var mapStateToProps = function(state, props) {
    // console.log(state, props, label)
    // console.log(state[label][label][props.interactiveNumber])
    return {
        interactive: state[label][label][props.interactiveNumber]
    };
};

    var Container = connect(mapStateToProps)(Interactive);

    return Container;
};