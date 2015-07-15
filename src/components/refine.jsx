/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Filter = React.createFactory(require('../components/filter'));
var Dropdown = React.createFactory(require('../components/dropdown'));

var Refine = React.createClass({

  render: function() {
    var that = this;
    var filtersList = this.props.filters || [];
    var selectedFilters = this.props.selected || {};
    return (
      <div className="refine-list">
        <div className="ix-container">
          <div className="heading">Refine</div>
          <div className="filter">
            <div className="title">Filters</div>
            {
              filtersList.map(function(data, i){
                return <Filter data={data} key={i} onSelect={that.props.onSelect} selected={selectedFilters[data.id]} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Refine;
