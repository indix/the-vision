/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');
var classNames = require('classnames');
var ClickAwayable = require('../mixins/click-awayable');
var $__0=  require('../utilities'),Format=$__0.Format;

var Dropdown = React.createClass({displayName: "Dropdown",

  mixins: [ClickAwayable],

  componentClickAway: function() {
    this.closeDropDown();
  },

  getDefaultProps: function() {
    return {
      defaultText: "Select",
      data: []
    };
  },
  getInitialState: function() {
    return {
      open: false,
      selected: {}
    };
  },

  componentDidMount: function() {
    if(this.props.defaultIndex > -1 && (this.props.data || []).length > this.props.defaultIndex)
      this.setState({selected: this.props.data[this.props.defaultIndex]});
  },

  openDropDown: function(){
    this.setState({
      open: true
    });
  },

  closeDropDown: function(){
    this.setState({
      open: false
    });
  },

  _onSelect: function(event){
    var index = event.target.getAttribute('data-index');
    var data = index === '-1' ? {} : this.props.data[index];
    if(+index === this.props.defaultIndex){
      this.closeDropDown();
      return;
    }
    this.setState({
      open: false,
      selected: data
    });
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect(data);
  },

  render: function() {
    var defaultIndex = this.props.defaultIndex;
    var data = this.props.data || [];
    return (
      React.createElement("div", {className: classNames('ix-dropdown', this.state)}, 
        React.createElement("div", {className: "value", onClick: this.openDropDown}, 
          React.createElement("span", null, this.state.selected && this.state.selected.name || this.props.defaultText)
        ), 
        React.createElement("ul", {className: "items", onClick: this._onSelect}, 
        !(defaultIndex > -1) && !(data.length > defaultIndex) &&
          React.createElement("li", {"data-index": "-1"}, this.props.defaultText), 
        
        
          data.map(function(option, index){
            return React.createElement("li", {"data-index": index, key: index}, option.name + (option.count ? ' ('+ Format.formatCount(option.count) +')' : ''));
          })
        
        )
      )
    );
  }

});

module.exports = Dropdown;
