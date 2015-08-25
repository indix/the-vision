/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Tile = React.createFactory(require('./tile'));

var Tiles = React.createClass({
  getDefaultProps() {
    return {
      type: 'pbcs',
      data: {}
    };
  },

  onProps(props){
    if(props.type.length > 4)
      throw new Error(this._reactInternalInstance.getName() + ': invalid type');
  },

  componentWillMount() {
    this.onProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.onProps(nextProps);
  },

  render: function() {
    var type = this.props.type;
    var tileSize = 12 / type.length;

    return (
      <div className="ix-tiles container-fluid">
        <div className="row">
          {type.indexOf('p') !== -1 &&
            <Tile type="p" count={this.props.data.product} size={tileSize}/>
          }
          {type.indexOf('b') !== -1 &&
            <Tile type="b" count={this.props.data.brand} size={tileSize}/>
          }
          {type.indexOf('c') !== -1 &&
            <Tile type="c" count={this.props.data.category} size={tileSize}/>
          }
          {type.indexOf('s') !== -1 &&
            <Tile type="s" count={this.props.data.store} size={tileSize}/>
          }
        </div>
      </div>
    );
  }

});

module.exports = Tiles;

