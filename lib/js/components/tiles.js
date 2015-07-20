/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Tile = React.createFactory(require('./tile'));

var Tiles = React.createClass({displayName: "Tiles",
  getDefaultProps:function() {
    return {
      type: 'pbcs',
      data: {}
    };
  },

  onProps:function(props){
    if(props.type.length > 4)
      throw new Error(this._reactInternalInstance.getName() + ': invalid type');
  },

  componentWillMount:function() {
    this.onProps(this.props);
  },

  componentWillReceiveProps:function(nextProps) {
    this.onProps(nextProps);
  },

  render: function() {
    var type = this.props.type;
    var tileSize = 12 / type.length;

    return (
      React.createElement("div", {className: "ix-tiles container-fluid"}, 
        React.createElement("div", {className: "row"}, 
          type.indexOf('p') !== -1 &&
            React.createElement(Tile, {type: "p", count: this.props.data.product, size: tileSize}), 
          
          type.indexOf('b') !== -1 &&
            React.createElement(Tile, {type: "b", count: this.props.data.brand, size: tileSize}), 
          
          type.indexOf('c') !== -1 &&
            React.createElement(Tile, {type: "c", count: this.props.data.category, size: tileSize}), 
          
          type.indexOf('s') !== -1 &&
            React.createElement(Tile, {type: "s", count: this.props.data.store, size: tileSize})
          
        )
      )
    );
  }

});

module.exports = Tiles;

