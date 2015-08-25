/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Loader = React.createFactory(require("../components/loader"));

var FullPageLoader = React.createClass({displayName: "FullPageLoader",

  render: function() {
    return (
      React.createElement("div", {className: "full-page-holder"}, 
        React.createElement("div", {className: "full-page-loader"}, 
          React.createElement(Loader, {visibility: true})
        )
      )
    );
  }

});

module.exports = FullPageLoader;
