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
  set(d){
    if(d instanceof Array)
      this.d = {list: d.splice(0, 1000)};
    else
      this.d = d;
  },
  get(){ return this.d },
  clear(){ this.d = {}; }
};

var BCSDirectoryClass = React.createClass({
  getInitialState: function(){
    return {
      maxitems: 100
    };
  },

  onProps(props){
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
     .done(data => BCSDirectoryStore.set(data))
     .always(() => that.setState({loading: false}))
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
      <div className="modal-content directory">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">
            <span className={classnames("letter", pbcs[type].className)}>{type}</span>
            <span className="title">{pbcs[type].text} Directory</span>
          </h4>
        </div>
        <div className="modal-body">
          <div className="directory-nav"  onClick={that._onNavClick}>
            {type === 'c' &&
              data.categoryPath.map(category => <span className="category-path" value={category.id}>{category.name}</span>)
              ||
              'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => <span className={classnames('alphabet', letter === BCSDirectoryStore.alphabet ? ['selected', pbcs[type].className] : '')} value={letter}>{letter}</span>)
            }
          </div>
          <div className="directory-container">
            <div className="directory-row">
              {this.state.loading &&
                <div className="loading">Fetching data...</div>
                ||
                data.list.map(function(item, i){
                  return (
                    <label className="option-container col-md-4" key={i} value={item.id}>
                      {that.props.multiselect &&
                        <input type="checkbox" onChange={that._onInputChange} />
                      }
                      <span className="text" onClick={that._onItemClick}>{item.name}</span>
                      {type === 'c' &&
                        <span className="category-item-drilldown" onClick={that._onCategoryDrilldown}>
                        </span>
                      }
                    </label>
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
          {this.props.multiselect &&
            <button type="button" className="btn btn-primary" onClick={this._onDone}>Done</button>
          }
        </div>
      </div>
    );
  }
});

var BCSDirectory = React.createFactory(BCSDirectoryClass);

var CustomModel = React.createClass({

  getInitialState() {
    return {};
  },

  componentDidMount() {
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

  bind(eventName){
    $(this.getDOMNode()).off(eventName || '');
    return this;
  },

  unbind(eventName, fn){
    $(this.getDOMNode()).on(eventName || '', fn || (() => true));
    return this;
  },

  configure(config){
    this.setState({config: config});
    return this;
  },

  open(){
    // this._checkInit();
    var el = this.getDOMNode();
    if(!$(el).data('bs.modal'))
      $(el).modal();
    $(el).modal('show');
    return this;
  },

  close(){
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
      content = <BCSDirectory {...config}/>;
    else
      content = (
        <div className="modal-content">
          <div className="modal-header">
            <button className="close" type="button" data-dismiss="modal" aria-label="Close" aria-hidden="true"><span>&times;</span></button>
            <h4 className="modal-title">{config.title || 'Hello there...'}</h4>
          </div>
          <div className="modal-body">
            <div className="modal-body-text">{config.body || 'It\'s a Delightful day!!!'}</div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" data-dismiss="modal">{config.closeText || 'Close'}</button>
            <button type="button" className={classnames('btn', config.errorModal ? 'btn-danger' : 'btn-primary')} data-dismiss="modal" onClick={config.onSuccess}>{config.successText || 'Done'}</button>
          </div>
        </div>
      );

    return (
      <div className="modal fade in" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={classnames("modal-dialog")}>
          {content}
        </div>
    </div>
    );
  }

});

module.exports = CustomModel;
