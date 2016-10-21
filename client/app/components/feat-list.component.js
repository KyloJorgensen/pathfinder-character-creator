'use strict';

var React = require('react'),
    connect = require('react-redux').connect,
    featActions = require('../actions/feat.actions'),
    Feat = require('./feat.component');

var FeatList = React.createClass({
    addFeat: function() {
        if (this.refs.featname.value) {
            this.props.dispatch(featActions.createFeat(this.props._characterId, this.refs.featname.value));
            this.refs.featname.value = '';
        }
    },
    render: function() {
        console.log(this);
        var feats = [];
        for (var i = 0; i < this.props.feats.length; i++) {
            feats.push(<Feat feat={this.props.feats[i]} />);
        }
        feats.push(<li><input type="text" onBlur={this.addFeat} name="featname" ref="featname" placeholder="NEW FEAT" /></li>);
        return (
            <ul className="feat-list">
                {feats}
            </ul>
        );
    }
});

var mapStateToProps = function(state, props) {
    return {
        feats: state.feat.feats
    };
};

var Container = connect(mapStateToProps)(FeatList);

module.exports = Container;