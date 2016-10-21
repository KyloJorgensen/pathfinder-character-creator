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
            </li>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        acitems: state.acitem.acitems
    };
};

var Container = connect(mapStateToProps)(Acitem);

module.exports = Container;