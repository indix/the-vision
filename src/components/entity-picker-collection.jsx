/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var assign = require('react/lib/Object.assign');
var EntityPicker = React.createFactory(require('./entity-picker'));

var EntityPickerCollection =  React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },

  getInitialState() {
    return {};
  },

  getDefaultProps() {
    return {
      type: 'bcs',
      editable: '000'
    };
  },

  _onSelect(data, type){
    var newData = this.state.data || assign({}, this.props.data);
    newData[type] = data;
    this.setState({data: newData});
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect(newData);
  },

  render: function(){
    var parse = this.props.parse || {};
    var data = this.props.data || {};
    var url = {};
    if(typeof(this.props.url) === 'string')
      url.p = url.b = url.c = url.s = this.props.url;
    else if(typeof(this.props.url) === 'object')
      url = this.props.url;

    var type = this.props.type;
    if(!type)
      type = 'bcs';
    type = type.split('').reduce(function(o, v, i) {o[v] = i+1;return o;}, {});
    var editable = this.props.editable.split('').reduce(function(o, v, i) {o[i+1] = +v;return o;}, {});
    var pickers = [];

    if(type.p)
      pickers.push(<EntityPicker onSelect={this._onSelect} data={data.p} type="p" editable={editable[type.p]} url={url.p} parse={parse.p} key="p" />);
    if(type.b)
      pickers.push(<EntityPicker onSelect={this._onSelect} data={data.b} type="b" editable={editable[type.b]} url={url.b} parse={parse.b} key="b" />);
    if(type.c)
      pickers.push(<EntityPicker onSelect={this._onSelect} data={data.c} type="c" editable={editable[type.c]} url={url.c} parse={parse.c} key="c" />);
    if(type.s && this.props.type.length > 1)
      pickers.push(<div className="picker-in" key="in">in</div>);
    if(type.s)
      pickers.push(<EntityPicker onSelect={this._onSelect} data={data.s} type="s" editable={editable[type.s]} url={url.s} parse={parse.s} key="s" />);

    return (
      <div className="ix-entity-picker-collection">
        {pickers}
      </div>
    );
  }
});

module.exports = EntityPickerCollection;
