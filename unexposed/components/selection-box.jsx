/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var SelectionBox = React.createClass({

  render: function() {
    return (
      <select className="ix-select">
      <option className="ix-option" value={this.props.kind}>{this.props.kind}</option>
      {
        this.props.options.map(function(option){
          return <option className="ix-option" value={option}>{option}</option>;
        })
      }
      </select>
    );
  }

});

module.exports = SelectionBox;
