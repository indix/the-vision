/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classNames = require('classnames');
var pbcs = require('../config/pbcs-config');

var Tile = React.createClass({displayName: "Tile",
  getDefaultProps:function() {
    return {
      type: 'p',
      size: 12
    };
  },

  render: function() {
    var tileClass = "ix-" + pbcs[this.props.type].className + "-tile";

    return (
      React.createElement("div", {className: classNames(tileClass, "ix-tile", "col-md-" + this.props.size)}, 
        React.createElement("div", {className: "filler"}), 
        React.createElement("div", {className: "count"}, this.props.count), 
        React.createElement("div", {className: "title"}, pbcs[this.props.type].text)
      )
    );
  }
});

module.exports = Tile;
