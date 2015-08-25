/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var SelectionBox = React.createClass({displayName: "SelectionBox",

  render: function() {
    return (
      React.createElement("select", {className: "ix-select"}, 
      React.createElement("option", {className: "ix-option", value: this.props.kind}, this.props.kind), 
      
        this.props.options.map(function(option){
          return React.createElement("option", {className: "ix-option", value: option}, option);
        })
      
      )
    );
  }

});

module.exports = SelectionBox;
