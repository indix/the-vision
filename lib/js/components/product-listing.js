/**
 * @jsx React.DOM
 */
'use strict';

var $ = require('jquery');
var React = require('react');
var $__0=  require('../utilities'),Format=$__0.Format;
var TextInput = React.createFactory(require('../components/text-input'));
var Dropdown = React.createFactory(require('../components/dropdown'));
var currencyString = require('../utilities/currency-string');
var Loader = React.createFactory(require('../components/loader'));
var FullPageLoader = React.createFactory(require('../components/full-page-loader'));

var InfoBar =  React.createFactory(
  React.createClass({
    defaultSortOptions: [{name: 'Ascending', id: 'asc'}, {name: 'Descending', id: 'dsc'}],

    getInitialState:function(){
      return {};
    },

    _onTextChange:function(value){
      this.setState({value: value});
      if(this.textTimer)
        window.clearTimeout(this.textTimer);
      this.textTimer = window.setTimeout(function()  {
        typeof(this.props.onTextChange) === 'function' && this.props.onTextChange(value);
      }.bind(this), 500);
    },

    render:function(){
      var self = this;
      var sortOptions = this.props.sortOptions || this.defaultSortOptions;
      var defaultIndex = 0;
      sortOptions.some(function(opt, i){
        if(opt.id === ((self.props.filters || {}).sortBy || {}).id){
          defaultIndex = i;
          return true;
        }
      });
      return (
        React.createElement("div", {className: "products-listing-header"}, 
          React.createElement("div", {className: "product-count"}, Format.formatCount(this.props.count), " ", React.createElement("span", {id: "small"}, "Products")), 
          React.createElement(TextInput, {placeholder: "Type...", loader: false, onChange: this._onTextChange, value: this.state.value || ((this.props.filters || {}).refineText || {}).id}), 
          React.createElement("p", null, "Refine"), 
          React.createElement(Dropdown, {data: sortOptions, onSelect: this.props.onSortSelect, defaultIndex: defaultIndex}), 
          React.createElement("p", null, "Sort By")
        )
      );
    }
  })
);

var ProductItem = React.createFactory(
  React.createClass({

    getDefaultProps:function() {
      return {
        productsPerRow: 4
      };
    },

    defaultImage: '/assets/images/no-image-small.png',
    defaultImageWidth: 100,

    getStyles:function(){
      return {
        container: {
          width: (100/this.props.productsPerRow) +'%'
        }
      };
    },

    render: function(){
      var data = this.props.data;
      var img = data.imageUrl && data.imageUrl !== 'NAN';
      var localUrl = "/explore#product/"+ data.mpid;
      return (
        React.createElement("div", {className: "product-listing-item", style: this.getStyles().container}, 
          React.createElement("div", {className: "product-listing-item-container"}, 
            React.createElement("a", {href: localUrl, className: "product-listing-item-image-container"}, 
              React.createElement("img", {src: img ? data.imageUrl : this.defaultImage, style: img ? {} : {width: this.defaultImageWidth, marginTop: '37px'}})
            ), 
            React.createElement("div", {className: "product-listing-item-data-container"}, 
              React.createElement("a", {href: localUrl, className: "title"}, data.title), 
              React.createElement("div", {className: "price"}, currencyString[data.currency], data.minSalePrice), 
              React.createElement("div", {className: "store-count"}, "Available in ", data.storeCount, " store", data.storeCount > 1 ? 's' : '')
            )
          )
        )
      );
    }
  })
);

var ProductListing =  React.createClass({displayName: "ProductListing",
  getDefaultProps:function() {
    return {
      data: {count: 0, proucts: []},
      productsPerRow: 3
    };
  },

  loadMoreProducts:function(){
    if(this.props.url){
      // generic case
    } else if(typeof(this.props.loadMore) === 'function'){
      this.props.loadMore();
    }
  },

  componentDidMount:function() {
    var that = this;
    $(window).bind('scroll.ix-listing', function(){
      if(($(document).height() - ($(window).height() + $(window).scrollTop())) < 390 * 2){
        if(!that.props.loading)
          that.loadMoreProducts();
      }
    });
  },

  componentWillUnmount:function() {
    $(window).unbind('scroll.ix-listing');
  },

  render: function(){
    var that = this;
    var data = this.props.data;
    if(!data.count){
      return React.createElement(FullPageLoader, null)
    }
    return (
      React.createElement("div", {className: "ix-products-listing"}, 
        this.props.infobar === true &&
          React.createElement(InfoBar, {count: data.count, sortOptions: this.props.infobarSortOptions, onTextChange: this.props.onInfobarTextChange, onSortSelect: this.props.onInfobarSortSelect, filters: this.props.infobarFilters}), 
        
        
          (data.products || []).map(function(product, i){
            return React.createElement(ProductItem, {data: product, productsPerRow: that.props.productsPerRow, key: i});
          }), 
        
        !this.props.loading && (data.products || []).length === 0 &&
          React.createElement("div", {className: "no-products-found", style: {textAlign: 'center', margin: 40}}, "No Products Founds"), 
        
        this.props.loading &&
          React.createElement("div", {className: "products-loader", style: {textAlign: 'center', marginBottom: 40}}, 
            React.createElement(Loader, {visibility: true})
          )
        
      )
    );
  }
});

module.exports = ProductListing;
