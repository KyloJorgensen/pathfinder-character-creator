'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    acitemActions = require('../actions/acitem.actions'),
    Acitem = require('./acitem.component');

var AcitemList = React.createClass({
    addAcitem: function() {
        if (this.refs.acitemname.value) {
            console.log(this.props._characterId, this.refs.acitemname.value)
            this.props.dispatch(acitemActions.createAcitem(this.props._characterId, this.refs.acitemname.value));
            this.refs.acitemname.value = '';
        }
    },
    render: function() {
        console.log(this);
        var acitems = [];
        for (var i = 0; i < this.props.acitems.length; i++) {
            acitems.push(<Acitem acitem={this.props.acitems[i]} />);
        }
        acitems.push(<li><input type="text" onBlur={this.addAcitem} name="acitemname" ref="acitemname" placeholder="NEW AC ITEM" /></li>);
        return (
            <ul className="acitem-list">
                {acitems}
            </ul>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        acitems: state.acitem.acitems
    };
};

var Container = connect(mapStateToProps)(AcitemList);

module.exports = Container;