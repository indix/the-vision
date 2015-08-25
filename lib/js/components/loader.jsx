/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classnames = require('classnames');

var Loader = React.createClass({

  render: function() {
    return (
      <div className="loader-container">
        <div className={classnames("loader",{visible:this.props.visibility})}>
        </div>
      </div>
    );
  }

});

module.exports = Loader;
