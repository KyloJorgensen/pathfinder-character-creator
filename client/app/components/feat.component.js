'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    featActions = require('../actions/feat.actions');

var Feat = React.createClass({
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
    saveFeat: function() {
        if (this.state.name == '') {
            this.props.dispatch(featActions.deleteFeat(this.props.feat._id, this.props.feat._characterId));
        } else {
            this.props.dispatch(featActions.updateFeat(this.state, this.props.feat));
        }
    },
    render: function() {
        if (!this.state._id) {
            if (this.props.feat.name) {
                this.setState(this.props.feat);
            }
        }
        return (
            <li className="feat">
                <input type="text" onChange={this.editField} onBlur={this.saveFeat} name="name" value={this.state.name} />
            </li>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        feats: state.feat.feats
    };
};

var Container = connect(mapStateToProps)(Feat);

module.exports = Container;