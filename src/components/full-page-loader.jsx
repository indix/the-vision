/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Loader = React.createFactory(require("../components/loader"));

var FullPageLoader = React.createClass({

  render: function() {
    return (
      <div className="full-page-holder">
        <div className="full-page-loader">
          <Loader visibility={true}/>
        </div>
      </div>
    );
  }

});

module.exports = FullPageLoader;
