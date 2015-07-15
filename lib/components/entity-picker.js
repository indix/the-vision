/**
 * @jsx React.DOM
 */
'use strict';

var $ = require('jquery');
var React = require('react');
var classnames = require('classnames');
var pbcs = require('../config/pbcs-config');
var AppConfig = require('../config.js');
var KeyCodes = require('../utilities/key-codes');
// var assign = Object.assign = require('react/lib/Object.assign');
var AutoSuggestList = React.createFactory(require('./auto-suggest-list'));

var EntityPicker =  React.createClass({displayName: "EntityPicker",

  propTypes: {
    type: React.PropTypes.string,
    url: React.PropTypes.string
  },

  getInitialState:function() {
    return {
      value: '',
      setValue: '',
      suggestions: [],
      suggestionsLoading: false
    };
  },

  getConfig: function(){
    return pbcs[this.props.type];
  },

  onProps:function(props){
    if(!props.type || !(props.type in pbcs))
      throw new Error(this._reactInternalInstance.getName() + ': Must mention a valid type');
    this.setState({
      setValue: props.data ? props.data.name : '',
      value: props.data ? props.data.name : ''
    });
  },

  componentWillMount:function(){
    this.onProps(this.props);
  },

  componentWillReceiveProps:function(nextProps) {
    this.onProps(nextProps);
  },

  clearValue:function(){
    // this.setState({setValue: '', value: ''});
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect({}, this.props.type);
  },

  _getValue:function(){
    return this.refs.input.getDOMNode().value;
  },

  _onSelect:function(data){
    if(+data.id === -1){
      window.modal.configure({
        bcsDirectory: true,
        type: this.props.type,
        url: AppConfig.api[this.props.type],
        onSelect: this.props.onSelect
      }).open();
      return;
    }
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect(data, this.props.type);
  },

  _onChange:function(){
    var that = this;
    this.setState({suggestionsLoading: true, value: this._getValue()});
    if(this._getValue()){
      try{ this.xhr.abort(); } catch(e){}
      this.xhr = $.get(this.props.url, { q: this._getValue() }).done(function(data)  {
        if(typeof(that.props.parse) === 'function')
          data = that.props.parse(data);
        that.setState({suggestions: data});
      }).always(function()  {return that.setState({suggestionsLoading: false});});
    }
  },

  _onKeyDown:function(event){
    if(event.keyCode === KeyCodes.UP)
      this.refs.autosuggest.moveUp(event);
    if(event.keyCode === KeyCodes.DOWN)
      this.refs.autosuggest.moveDown(event);
    if(event.keyCode === KeyCodes.ENTER)
      this.refs.autosuggest.select(event);
  },

  _onBlur:function(){
    this.setState({value: this.state.setValue, editMode: false});
  },

  _onFocus:function(){
    this.setState({value: null, editMode: true});
  },

  _onClick:function(){
    if(this.props.editable){
      // HACK - Since text category search is not supported
      if(this.props.type === 'c'){
        window.modal.configure({
          categoryId: this.props.data && this.props.data.id,
          bcsDirectory: true,
          type: this.props.type,
          url: AppConfig.api[this.props.type],
          onSelect: this.props.onSelect
        }).open();
        return;
      }
      this.refs.input.getDOMNode().focus();
    }
  },

  render: function(){
    // var data = this.props.data || {name: "All"};
    var config = this.getConfig();
    return (
      React.createElement("div", {className: classnames("ix-entity-picker", config.className, {editable: this.props.editable})}, 
        React.createElement("input", {type: "text", onChange: this._onChange, ref: "input", value: this.state.value, onKeyDown: this._onKeyDown, onBlur: this._onBlur, onFocus: this._onFocus, className: this.state.setValue ? 'set' : ''}), 
        React.createElement("div", {ref: "visibleText", className: classnames("picker-text", {empty: !this.state.value}), title: this.state.setValue, onClick: this._onClick}, this.state.editMode ? this.state.value : this.state.setValue), 
        this.props.editable && [
          React.createElement("hr", {className: "picker-bottom-line", key: "0"}),
          React.createElement(AutoSuggestList, {data: this.state.suggestions, type: this.props.type, ref: "autosuggest", loading: this.state.suggestionsLoading, onSelect: this._onSelect, empty: !this.state.value, key: "1"}),
          React.createElement("div", {className: "picker-clear btn-link", onClick: this.clearValue, style: {display: this.state.setValue ? 'block':'none'}, key: "2"}, "Clear")
          ] || '', 
        
        React.createElement("div", {className: "picker-all-text"}, "ALL"), 
        React.createElement("div", {className: "picker-placeholder", onClick: this._onClick}, config.text), 
        React.createElement("div", {className: "value-placeholder", ref: "valuePlaceholder", style: {display: this.state.value ? 'none':'block'}}, this.state.setValue)
      )
    );
  }
});

module.exports = EntityPicker;
