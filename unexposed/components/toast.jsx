/**
 * @jsx React.DOM
 */
'use strict';
var $ = require('jquery');
var React = require('react');
var classnames = require('classnames');

var toast = React.createClass({
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

  show(config){
    config = config || {};
    config.isClosed = false;
    config.onOpen = config.onOpen || false;
    config.onClose = config.onClose || false;
    config.autohide = config.autohide || false;
    this.setState(config);

    typeof(config.onOpen) === 'function' && config.onOpen();
    return this;
  },

  autoHide(config){
    config = config || {};
    config.autohide = true;
    this.show(config);
    return this;
  },

  hide(){
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
      <div className={classnames('toast-container', this.state.isClosed ? 'closed' : '')}>
        <div className={classnames('toast alert', 'alert-'+this.state.type)}>
          <span className="close" onClick={this.hide}>&times;</span>
          <span className="toast-msg">{this.state.message}</span>
        </div>
      </div>
    );
  }

});

module.exports = toast;
