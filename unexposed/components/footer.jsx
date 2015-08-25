/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var CustomFooter = React.createClass({

  styles: {
    footer: {
      marginTop: '10px'
    }
  },

  render: function(){
    return (
      <footer style={this.styles.footer}>
        <div className="container">
          &copy; 2015 Indix&trade;
        </div>
      </footer>
    );
  }
});

module.exports = CustomFooter;
