/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var CustomFooter = React.createClass({displayName: "CustomFooter",

  styles: {
    footer: {
      marginTop: '10px'
    }
  },

  render: function(){
    return (
      React.createElement("footer", {style: this.styles.footer}, 
        React.createElement("div", {className: "container"}, 
          "© 2015 Indix™"
        )
      )
    );
  }
});

module.exports = CustomFooter;
