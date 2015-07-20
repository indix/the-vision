/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Filter = React.createFactory(require('../components/filter'));
var Dropdown = React.createFactory(require('../components/dropdown'));

var Refine = React.createClass({displayName: "Refine",

  render: function() {
    var that = this;
    var filtersList = this.props.filters || [];
    var selectedFilters = this.props.selected || {};
    return (
      React.createElement("div", {className: "refine-list"}, 
        React.createElement("div", {className: "ix-container"}, 
          React.createElement("div", {className: "heading"}, "Refine"), 
          React.createElement("div", {className: "filter"}, 
            React.createElement("div", {className: "title"}, "Filters"), 
            
              filtersList.map(function(data, i){
                return React.createElement(Filter, {data: data, key: i, onSelect: that.props.onSelect, selected: selectedFilters[data.id]});
              })
            
          )
        )
      )
    );
  }

});

module.exports = Refine;
