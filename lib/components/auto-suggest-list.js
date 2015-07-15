/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var _ = require('underscore');
var classnames = require('classnames');
var pbcs = require('../config/pbcs-config');
var Dom = require('../utilities/dom');

var AutoSuggestList =  React.createClass({displayName: "AutoSuggestList",

  getInitialState:function() {
    return {
      highlighted: -1,
    };
  },

  propTypes: {
    maxLength: React.PropTypes.number,
    type: React.PropTypes.string
  },

  getDefaultProps:function() {
    return { maxLength: 4 };
  },

  onProps:function(props){
    if(!props.type)
      throw new Error(this._reactInternalInstance.getName() + ': Must mention a valid type');
    if(props.maxLength && props.maxLength < 1)
      throw new Error(this._reactInternalInstance.getName() + ': max-length must be greater 0');
  },

  componentWillReceiveProps:function(nextProps) {
    this.onProps(nextProps);
  },

  componentWillMount:function(){
    this.onProps(this.props);
  },

  moveUp:function(event, current){
    if(!this.props.data || _.isEmpty(this.props.data))
      return;
    var liEl = this.getDOMNode().getElementsByTagName('li');
    var i = (current || this.state.highlighted) - 1;
    if(i < 0)
      i = liEl.length - 1;
    if(!liEl[i].classList.contains('autosuggest-item'))
      return this.moveUp({}, i);
    this.setState({highlighted: i});
  },

  moveDown:function(event, current){
    if(!this.props.data || _.isEmpty(this.props.data))
      return;
    var liEl = this.getDOMNode().getElementsByTagName('li');
    var i = (current || this.state.highlighted) + 1;
    if(i >= liEl.length)
      i = 0;
    if(!liEl[i].classList.contains('autosuggest-item'))
      return this.moveDown({}, i);
    this.setState({highlighted: i});
  },

  select:function(event){
    // selection by enter key
    var liEl = this.getDOMNode().getElementsByTagName('li')[this.state.highlighted];
    var id, type, text;
    if(liEl){
      id = liEl.getAttribute('data-id');
      type = liEl.getAttribute('data-type');
      text = liEl.innerHTML;
    } else {
      id = -1;
      type = this.props.type.indexOf('p') > -1 ? 'p' : this.props.type;
      text = event.target.value;
    }
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect({
        id: id,
        name: text,
        type: type
      });
  },

  _onItemHoverIn:function(event){
    this.setState({highlighted: Dom.positionCount(event.target) - 1});
  },

  _onHoverOut:function(){
    this.setState({highlighted: -1});
  },

  _onSelect:function(event){
    // selection by mouse click
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect({
        id: event.target.getAttribute('data-id'),
        name: encodeURI(event.target.innerHTML),
        type: event.target.getAttribute('data-type')
      });
  },

  _getAutoSuggestItem:function(i, classes, id, text, type){
    return (
      React.createElement("li", {className: classnames(classes, "autosuggest-item", {highlighted: this.state.highlighted === i}), "data-id": id, "data-type": type, onMouseEnter: this._onItemHoverIn, onClick: this._onSelect, key: i}, text)
    );
  },

  render: function(){
    var items = [];
    var type = this.props.type;
    var data = this.props.data;

    if(!this.props.loading && !this.props.empty && (!data || _.isEmpty(data))){
      return (
        React.createElement("ul", {className: "ix-autosuggest"}, 
          React.createElement("li", {className: "autosuggest-item"}, "No Suggestions Found")
        )
      );
    }

    if(this.props.empty && (!data || !data.length))
      return (React.createElement("ul", {className: "ix-autosuggest"}, React.createElement("li", {className: "autosuggest-item"}, "Type something...")));

    if(this.props.loading)
      return (React.createElement("ul", {className: "ix-autosuggest"}, React.createElement("li", {className: "autosuggest-item"}, "Loading...")));

    if(type.length === 1)
      for (var i = 0; i < this.props.maxLength && i < data.length; i++)
        items.push(this._getAutoSuggestItem(
          items.length,
          pbcs[type].className,
          data[i].id,
          data[i].name + (data[i].count ? ' ('+ data[i].count +')' : ''),
          type
        ));
    else
      for(var j = 0; j < type.length; j++){
        var t = type[j];
        var dataItem = data[t] || [];
        items.push(React.createElement("li", {className: classnames("autosuggest-header", pbcs[t].className), key: t+j}, pbcs[t].plural));
        for (var i = 0; i < this.props.maxLength && i < dataItem.length; i++)
          items.push(this._getAutoSuggestItem(
            items.length + 1,
            pbcs[t].className,
            dataItem[i].id,
            dataItem[i].name + (dataItem[i].count ? ' ('+ dataItem[i].count +')' : ''),
            t
          ));
        // (t === 'b' || t === 's') && items.push(this._getAutoSuggestItem(items.length + 1, pbcs[t].className, -1, 'Show all '+pbcs[t].text + ' >', t));
      }

    var allText;
    if(type.length === 1){
      items.push(this._getAutoSuggestItem(
         items.length,
        'all',
        -1,
        'Show all '+ pbcs[type].plural +' >',
        type
      ));
    } else {
      items.unshift(this._getAutoSuggestItem(
         0,
        'p',
        -1,
        'Show all results for "'+ this.props.text +'"',
        'p'
      ));
    }


    return (
      React.createElement("ul", {className: "ix-autosuggest", onMouseLeave: this._onHoverOut}, 
        items
      )
    );
  }
});

module.exports = AutoSuggestList;
