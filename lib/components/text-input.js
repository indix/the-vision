/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Loader = React.createFactory(require('../components/loader'));

var TextInput = React.createClass({displayName: "TextInput",

  componentWillMount:function() {
    this.setState({value: this.props.value});
  },

  componentWillReceiveProps:function(nextProps) {
    this.setState({value: nextProps.value});
  },

  _onFocus:function(event){
    this.getDOMNode().classList.add('focussed');
    if(typeof(this.props.onFocus) === 'function')
      this.props.onFocus(event);
  },

  _onBlur:function(event){
    this.getDOMNode().classList.remove('focussed');
    if(typeof(this.props.onBlur) === 'function')
      this.props.onBlur(event);
  },

  _onChange:function(event){
    if(typeof(this.props.onChange) === 'function')
      this.props.onChange(event.target.value);
  },

  clear:function(){
    this.setState({value: ''});
    this._onChange({target: {value: ''}});
  },

  render: function() {
    return (
      React.createElement("div", {className: "ix-text-block"}, 
        React.createElement("input", {type: "text", placeholder: this.props.placeholder, className: "ix-text-input", onFocus: this._onFocus, onBlur: this._onBlur, onChange: this._onChange, onKeyDown: this.props.onKeyDown, value: this.state.value || '', ref: "input"}), 
        React.createElement("div", {className: "glyphicon glyphicon-remove", onClick: this.clear}), 
        React.createElement(Loader, {visibility: this.props.loading})
      )
    );
  }

});

module.exports = TextInput;
