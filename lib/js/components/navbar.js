/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classnames = require('classnames');
var KeyCodes = require('../utilities/key-codes');
var TextInput = React.createFactory(require('../components/text-input'));
var AutoSuggestList = React.createFactory(require('../components/auto-suggest-list'));
var classnames = require('classnames');

var Navbar = React.createClass({displayName: "Navbar",

  styles: {
    nav: {
      borderRadius: 0,
      marginBottom: 0
    },
    logo: {
      height: '100%',
      display: 'inline-block'
    },
    searchBar: {
      width: 400
    }
  },

  getInitialState: function(){
    return {
      focussed: false,
      suggestions:[],
      value: '',
      suggestionsLoading: false,
      notificationCount: 0,
      showCount: false
    };
  },
  _handleNotificationCount: function(){
    var count = this.props.notificationCount;
    count > 0 && (count <= 10 ? this.setState({notificationCount: count, showCount: true}) : this.setState({notificationCount: "10+", showCount: true}));
  },
  _onClick: function(event){
    if(!$(event.target).parents('.navbar-form').length)
      this.setState({focussed: false, value: null});
  },

  _onFocus:function(){
    this.setState({focussed: true});
  },
  _onBlur:function(){
    //
  },
  _onChange: function(val){
    var that = this;
    this.setState({suggestionsLoading: false, value: val});
    try{ this.xhr.abort(); } catch(e){}
    if(val){
      this.setState({suggestionsLoading: true, value: val});
      this.xhr = $.get(this.props.url, { q: val }).done(function(data)  {
        if(typeof(that.props.parse) === 'function')
          data = that.props.parse(data);
        that.setState({suggestions: data});
      }).always(function()  {return that.setState({suggestionsLoading: false});});
    }
  },
  _onKeyDown: function(event){
    switch(event.keyCode){
      case KeyCodes.UP:
        this.refs.autosuggest.moveUp(event);
        break;
      case KeyCodes.DOWN:
        this.refs.autosuggest.moveDown(event);
        break;
      case KeyCodes.ENTER:
        this.refs.autosuggest.select(event);
        break;
      case KeyCodes.ESC:
        this.setState({focussed: false, value: null});
        this.getDOMNode().querySelector('.form-group .ix-text-input').blur();
        break;
    }
  },
  _onSelect: function(data){
    // $(".ix-text-input").blur();
    if(data.type === 'p'){
      var q = +data.id === -1 ? this.state.value : data.name;
      this.setState({focussed: false, value: null});
      window.location = '/explore#search/' + encodeURI(q);
    } else {
      if(data.id > -1){
        data[data.type] = data.id;
        this.setState({focussed: false, value: null});
        window.location = '/explore#bcs/' + (data.b || '-') + (data.c || '-') + (data.s || '-');
      } else {
        // open directory
        // not showing this part right now
      }
    }
    this.getDOMNode().querySelector('.form-group .ix-text-input').blur();
  },
  componentDidMount: function() {
    this._handleNotificationCount();
  },

  render:function() {
    return (
      React.createElement("nav", {className: classnames("navbar navbar-inverse navbar-fixed-top", {focussed: this.state.focussed}), style: this.styles.nav, onClick: this._onClick}, 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "navbar-header"}, 
            React.createElement("div", {className: "navbar-brand", style: {padding: '10px 15px',height: 60}}, 
              React.createElement("a", {href: "/"}, 
                React.createElement("img", {src: "/logo_white.png", style: this.styles.logo}), 
                React.createElement("div", {className: "title"}, "Product Catalog")
              )
            )
          ), 
          React.createElement("div", {className: "navbar-form navbar-left"}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement(TextInput, {placeholder: "Search", onFocus: this._onFocus, onBlur: this._onBlur, onChange: this._onChange, loading: this.state.suggestionsLoading, onKeyDown: this._onKeyDown, value: this.state.value}), 
              React.createElement(AutoSuggestList, {data: this.state.suggestions, type: "pbs", ref: "autosuggest", onSelect: this._onSelect, loading: this.state.suggestionsLoading, empty: !this.state.value, text: this.state.value, maxLength: 3})
            )
          ), 
          React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
            React.createElement("li", {style: {marginTop: 5,marginRight: 30}}, 
              React.createElement("a", {href: "/export-history"}, "Export history")
            ), 
            React.createElement("li", {style: {marginTop: 10}}, 
              React.createElement("a", {className: "logout", href: "/logout"}, "Logout")
            )
          )
        ), 
        React.createElement("div", {className: "backdrop"})
      )
    );
  }

});

module.exports = Navbar;
