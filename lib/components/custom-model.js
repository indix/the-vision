/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var pbcs = require('../config/pbcs-config');
var classnames = require('classnames');
var $ = require('jquery');
var GeneralUtil = require('../utilities/general');
require('bootstrap-sass/assets/javascripts/bootstrap/modal');

var BCSDirectoryStore = {
  d: {},
  alphabet: 'a',
  category: -1,
  set:function(d){
    if(d instanceof Array)
      this.d = {list: d.splice(0, 1000)};
    else
      this.d = d;
  },
  get:function(){ return this.d },
  clear:function(){ this.d = {}; }
};

var BCSDirectoryClass = React.createClass({displayName: "BCSDirectoryClass",
  getInitialState: function(){
    return {
      maxitems: 100
    };
  },

  onProps:function(props){
    BCSDirectoryStore.category =  props.categoryId || -1;
    BCSDirectoryStore.alphabet =  props.alphabet || 'a';
    BCSDirectoryStore.clear();
    this.fetch(props);
  },

  componentDidMount: function() {
    if (!this.props.type in pbcs)
      console.error("Incorrect type for Directory");
    this.onProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.onProps(nextProps);
  },

  fetch: function(props){
    var that = this;
    this.setState({loading: true, maxitems: 100});
    var url = props.url + (props.type === 'c' ? '?category='+BCSDirectoryStore.category : '/'+BCSDirectoryStore.alphabet);
    $.get(url)
     .done(function(data)  {return BCSDirectoryStore.set(data);})
     .always(function()  {return that.setState({loading: false});})
  },

  getData: function(){
    var data = BCSDirectoryStore.get();
    if(this.props.type === 'c'){
      data = data || {};
      var parent = (data.parent || [])[0] || {};
      return {
        categoryPath: GeneralUtil.constructCategoryPath(parent.path, parent.parent_path),
        list: data.children || []
      };
    }
    return {
      list: (data.list || []).slice(0, this.state.maxitems)
    };
  },

  _onInputChange: function(){
    //multiselect checkbon change
    if(!this.props.multiselect)
      return;
  },

  _onNavClick: function(event){
    var val = event.target.getAttribute("value");
    if(!val)
      return;
    if(isNaN(+val))
      BCSDirectoryStore.alphabet = val;
    else
      BCSDirectoryStore.category = +val;
    this.fetch(this.props);
  },

  _onItemClick: function(event){
    if(this.props.multiselect)
      return;
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect({
        id: +event.target.parentElement.getAttribute('value'),
        name: event.target.innerText,
      }, this.props.type);
    window.modal.close();
  },

  _onCategoryDrilldown: function(event){
    var val = event.target.parentElement.getAttribute("value");
    if(isNaN(+val))
      return;
    BCSDirectoryStore.category = val;
    this.fetch(this.props);
  },

  _onDone: function(){
    // send the multiselected items
  },

  render: function(){
    var that = this;
    var type = this.props.type;
    var data = this.getData();
    return(
      React.createElement("div", {className: "modal-content directory"}, 
        React.createElement("div", {className: "modal-header"}, 
          React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
          React.createElement("h4", {className: "modal-title", id: "myModalLabel"}, 
            React.createElement("span", {className: classnames("letter", pbcs[type].className)}, type), 
            React.createElement("span", {className: "title"}, pbcs[type].text, " Directory")
          )
        ), 
        React.createElement("div", {className: "modal-body"}, 
          React.createElement("div", {className: "directory-nav", onClick: that._onNavClick}, 
            type === 'c' &&
              data.categoryPath.map(function(category)  {return React.createElement("span", {className: "category-path", value: category.id}, category.name);})
              ||
              'abcdefghijklmnopqrstuvwxyz'.split('').map(function(letter)  {return React.createElement("span", {className: classnames('alphabet', letter === BCSDirectoryStore.alphabet ? ['selected', pbcs[type].className] : ''), value: letter}, letter);})
            
          ), 
          React.createElement("div", {className: "directory-container"}, 
            React.createElement("div", {className: "directory-row"}, 
              this.state.loading &&
                React.createElement("div", {className: "loading"}, "Fetching data...")
                ||
                data.list.map(function(item, i){
                  return (
                    React.createElement("label", {className: "option-container col-md-4", key: i, value: item.id}, 
                      that.props.multiselect &&
                        React.createElement("input", {type: "checkbox", onChange: that._onInputChange}), 
                      
                      React.createElement("span", {className: "text", onClick: that._onItemClick}, item.name), 
                      type === 'c' &&
                        React.createElement("span", {className: "category-item-drilldown", onClick: that._onCategoryDrilldown}
                        )
                      
                    )
                  );
                })
              
            )
          )
        ), 
        React.createElement("div", {className: "modal-footer"}, 
          React.createElement("button", {type: "button", className: "btn btn-link", "data-dismiss": "modal"}, "Close"), 
          this.props.multiselect &&
            React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this._onDone}, "Done")
          
        )
      )
    );
  }
});

var BCSDirectory = React.createFactory(BCSDirectoryClass);

var CustomModel = React.createClass({displayName: "CustomModel",

  getInitialState:function() {
    return {};
  },

  componentDidMount:function() {
    // Exposing picky functions and not the React object
    window.modal = {
      open: this.open,
      close: this.close,
      el: this.getDOMNode(),
      on: this.bind,
      off: this.unbind,
      configure: this.configure
    };
  },

  bind:function(eventName){
    $(this.getDOMNode()).off(eventName || '');
    return this;
  },

  unbind:function(eventName, fn){
    $(this.getDOMNode()).on(eventName || '', fn || (function()  {return true;}));
    return this;
  },

  configure:function(config){
    this.setState({config: config});
    return this;
  },

  open:function(){
    // this._checkInit();
    var el = this.getDOMNode();
    if(!$(el).data('bs.modal'))
      $(el).modal();
    $(el).modal('show');
    return this;
  },

  close:function(){
    // this._checkInit();
    var el = this.getDOMNode();
    if(!$(el).data('bs.modal'))
      $(el).modal();
    $(el).modal('hide');
    return this;
  },

  render: function() {
    var config = this.state.config || {};
    var content = '';
    if(config.bcsDirectory === true && config.type in pbcs)
      content = React.createElement(BCSDirectory, React.__spread({},  config));
    else
      content = (
        React.createElement("div", {className: "modal-content"}, 
          React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {className: "close", type: "button", "data-dismiss": "modal", "aria-label": "Close", "aria-hidden": "true"}, React.createElement("span", null, "×")), 
            React.createElement("h4", {className: "modal-title"}, config.title || 'Hello there...')
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("div", {className: "modal-body-text"}, config.body || 'It\'s a Delightful day!!!')
          ), 
          React.createElement("div", {className: "modal-footer"}, 
            React.createElement("button", {type: "button", className: "btn btn-link", "data-dismiss": "modal"}, config.closeText || 'Close'), 
            React.createElement("button", {type: "button", className: classnames('btn', config.errorModal ? 'btn-danger' : 'btn-primary'), "data-dismiss": "modal", onClick: config.onSuccess}, config.successText || 'Done')
          )
        )
      );

    return (
      React.createElement("div", {className: "modal fade in", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel", "aria-hidden": "true"}, 
        React.createElement("div", {className: classnames("modal-dialog")}, 
          content
        )
    )
    );
  }

});

module.exports = CustomModel;
