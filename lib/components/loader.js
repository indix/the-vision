/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classnames = require('classnames');

var Loader = React.createClass({displayName: "Loader",

  render: function() {
    return (
      React.createElement("div", {className: "loader-container"}, 
        React.createElement("div", {className: classnames("loader",{visible:this.props.visibility})}
        )
      )
    );
  }

});

module.exports = Loader;
