/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Dropdown = React.createFactory(require('../components/dropdown'));

var Filter = React.createClass({

  name_map: {
    alsoSoldAt: 'Also Sold At',
    otherBrands: 'Brand',
    numStores: 'No. of Stores'
  },

  _onSelect(data){
    data.filterId = (this.props.data || {}).id;
    data.filterName = (this.props.data || {}).name;
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect(data);
  },

  render: function() {
    // var that = this;
    var data = this.props.data || {};
    var options = data.options instanceof Array && data.options.slice(0) || [];
    var selected = this.props.selected;
    var name = this.name_map[data.name];
    if(selected){
      options.unshift({id: -1, name: '< Reset Filter >'});
      (options || []).some((option, index) => {
        if(+option.id === +selected.id){
          selected = index;
          return true;
        }
      });
    }
    return (
      <div>
        <p>{name}</p>
        <Dropdown data={options} onSelect={this._onSelect} defaultIndex={selected} />
      </div>
    );
  }
});

module.exports = Filter;
