/**
 * @jsx React.DOM
 */
'use strict';
var $ = require('jquery');
var React = require('react');
var classnames = require('classnames');

var toast = React.createClass({displayName: "toast",
  getInitialState: function() {
    return {
      message: 'Sample toast wishes you a good day!',
      autohide: false,
      autohideTime: 3000,
      type: 'success',
      isClosed: true
    };
  },

  componentDidMount: function() {
    window.toast = {
      show: this.show,
      hide: this.hide,
      autoHide: this.autoHide
    }
  },

  show:function(config){
    config = config || {};
    config.isClosed = false;
    config.onOpen = config.onOpen || false;
    config.onClose = config.onClose || false;
    config.autohide = config.autohide || false;
    this.setState(config);

    typeof(config.onOpen) === 'function' && config.onOpen();
    return this;
  },

  autoHide:function(config){
    config = config || {};
    config.autohide = true;
    this.show(config);
    return this;
  },

  hide:function(){
    this.setState({isClosed: true, autohide: false});
    typeof(this.state.onClose) === 'function' && this.state.onClose();
    return this;
  },

  render: function() {
    var that = this;
    if(this.state.autohide)
      setTimeout(function(){
        that.hide();
      }, this.state.autohideTime);

    return (
      React.createElement("div", {className: classnames('toast-container', this.state.isClosed ? 'closed' : '')}, 
        React.createElement("div", {className: classnames('toast alert', 'alert-'+this.state.type)}, 
          React.createElement("span", {className: "close", onClick: this.hide}, "×"), 
          React.createElement("span", {className: "toast-msg"}, this.state.message)
        )
      )
    );
  }

});

module.exports = toast;
