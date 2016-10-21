'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    acitemActions = require('../actions/acitem.actions');

var Acitem = React.createClass({
    getInitialState: function() {
        var state = {};
        state._id = false;
        return state;
    }, 
    editField: function(that) {
        var state = this.state;
        state[that.target.name] = that.target.value;
        this.setState(state);
    },
    saveAcitem: function() {
        if (this.state.name == '') {
            this.props.dispatch(acitemActions.deleteAcitem(this.props.acitem._id, this.props.acitem._characterId));
        } else {
            this.props.dispatch(acitemActions.updateAcitem(this.state, this.props.acitem));
        }
    },
    render: function() {
        if (!this.state._id) {
            if (this.props.acitem.name) {
                this.setState(this.props.acitem);
            }
        }
        return (
            <li className="acitem">
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="name" value={this.state.name} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="bonus" value={this.state.bonus} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="type" value={this.state.type} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="check_penalty" value={this.state.check_penalty} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="spell_failure" value={this.state.spell_failure} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="weight" value={this.state.weight} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="properties" value={this.state.properties} />
                <input type="text" onChange={this.editField} onBlur={this.saveAcitem} name="max_dex_bonus" value={this.state.max_dex_bonus} />
            </li>
        );
    }
});

var Container = connect()(Acitem);

module.exports = Container;