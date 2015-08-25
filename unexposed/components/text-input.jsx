/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Loader = React.createFactory(require('../components/loader'));

var TextInput = React.createClass({

  componentWillMount() {
    this.setState({value: this.props.value});
  },

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  },

  _onFocus(event){
    this.getDOMNode().classList.add('focussed');
    if(typeof(this.props.onFocus) === 'function')
      this.props.onFocus(event);
  },

  _onBlur(event){
    this.getDOMNode().classList.remove('focussed');
    if(typeof(this.props.onBlur) === 'function')
      this.props.onBlur(event);
  },

  _onChange(event){
    if(typeof(this.props.onChange) === 'function')
      this.props.onChange(event.target.value);
  },

  clear(){
    this.setState({value: ''});
    this._onChange({target: {value: ''}});
  },

  render: function() {
    return (
      <div className="ix-text-block">
        <input type="text" placeholder={this.props.placeholder} className="ix-text-input" onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChange} onKeyDown={this.props.onKeyDown} value={this.state.value || ''} ref="input" />
        <div className="glyphicon glyphicon-remove" onClick={this.clear} ></div>
        <Loader visibility={this.props.loading} />
      </div>
    );
  }

});

module.exports = TextInput;
