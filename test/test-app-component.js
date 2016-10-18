// 'use strict';

// var React = require('react'),
//     TestUtils = require('react-addons-test-utils'),
//     should = require('chai').should(),
//     AddCardForm = require('../components/addCardForm-react-component');

// describe('AddCardForm component', function() {
//     it('Renders the Add Card Form',  function() {
//         var value = 1,
//             onAddInputChanged = function(event) {},
//             onAddSubmit = function(event) {},
//             renderer = TestUtils.createRenderer();

//         renderer.render(<AddCardForm value={value} onAddInputChanged={onAddInputChanged} onAddSubmit={onAddSubmit} />);
        
//         var result = renderer.getRenderOutput();
//         result.props.className.should.equal('addCardForm');
//         result.props.onSubmit.should.be.a('function');
//         result.props.children[0].type.should.equal('input');
//         result.props.children[0].props.type.should.equal('text');
//         result.props.children[0].props.value.should.equal(value);
//         result.props.children[0].props.onChange.should.be.a('function');
//         result.props.children[1].type.should.equal('input');
//         result.props.children[1].props.type.should.equal('submit');
//     });
// });