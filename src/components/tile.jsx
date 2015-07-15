/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classNames = require('classnames');
var pbcs = require('../config/pbcs-config');

var Tile = React.createClass({
  getDefaultProps() {
    return {
      type: 'p',
      size: 12
    };
  },

  render: function() {
    var tileClass = "ix-" + pbcs[this.props.type].className + "-tile";

    return (
      <div className={classNames(tileClass, "ix-tile", "col-md-" + this.props.size)}>
        <div className="filler"></div>
        <div className="count">{this.props.count}</div>
        <div className="title">{pbcs[this.props.type].text}</div>
      </div>
    );
  }
});

module.exports = Tile;
