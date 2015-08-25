/**
 * @jsx React.DOM
 */
'use strict';

var $ = require('jquery');
var React = require('react');
var {Format} = require('../utilities');
var TextInput = React.createFactory(require('../components/text-input'));
var Dropdown = React.createFactory(require('../components/dropdown'));
var currencyString = require('../utilities/currency-string');
var Loader = React.createFactory(require('../components/loader'));
var FullPageLoader = React.createFactory(require('../components/full-page-loader'));

var InfoBar =  React.createFactory(
  React.createClass({
    defaultSortOptions: [{name: 'Ascending', id: 'asc'}, {name: 'Descending', id: 'dsc'}],

    getInitialState(){
      return {};
    },

    _onTextChange(value){
      this.setState({value: value});
      if(this.textTimer)
        window.clearTimeout(this.textTimer);
      this.textTimer = window.setTimeout(() => {
        typeof(this.props.onTextChange) === 'function' && this.props.onTextChange(value);
      }, 500);
    },

    render(){
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
        <div className="products-listing-header">
          <div className="product-count">{Format.formatCount(this.props.count)} <span id="small">Products</span></div>
          <TextInput placeholder="Type..." loader={false} onChange={this._onTextChange} value={this.state.value || ((this.props.filters || {}).refineText || {}).id}/>
          <p>Refine</p>
          <Dropdown data={sortOptions} onSelect={this.props.onSortSelect} defaultIndex={defaultIndex}/>
          <p>Sort By</p>
        </div>
      );
    }
  })
);

var ProductItem = React.createFactory(
  React.createClass({

    getDefaultProps() {
      return {
        productsPerRow: 4
      };
    },

    defaultImage: '/assets/images/no-image-small.png',
    defaultImageWidth: 100,

    getStyles(){
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
        <div className="product-listing-item" style={this.getStyles().container}>
          <div className="product-listing-item-container">
            <a href={localUrl} className="product-listing-item-image-container">
              <img src={img ? data.imageUrl : this.defaultImage} style={img ? {} : {width: this.defaultImageWidth, marginTop: '37px'}}/>
            </a>
            <div className="product-listing-item-data-container">
              <a href={localUrl} className="title">{data.title}</a>
              <div className="price">{currencyString[data.currency]}{data.minSalePrice}</div>
              <div className="store-count">Available in {data.storeCount} store{data.storeCount > 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
      );
    }
  })
);

var ProductListing =  React.createClass({
  getDefaultProps() {
    return {
      data: {count: 0, proucts: []},
      productsPerRow: 3
    };
  },

  loadMoreProducts(){
    if(this.props.url){
      // generic case
    } else if(typeof(this.props.loadMore) === 'function'){
      this.props.loadMore();
    }
  },

  componentDidMount() {
    var that = this;
    $(window).bind('scroll.ix-listing', function(){
      if(($(document).height() - ($(window).height() + $(window).scrollTop())) < 390 * 2){
        if(!that.props.loading)
          that.loadMoreProducts();
      }
    });
  },

  componentWillUnmount() {
    $(window).unbind('scroll.ix-listing');
  },

  render: function(){
    var that = this;
    var data = this.props.data;
    if(!data.count){
      return <FullPageLoader/>
    }
    return (
      <div className="ix-products-listing">
        {this.props.infobar === true &&
          <InfoBar count={data.count} sortOptions={this.props.infobarSortOptions} onTextChange={this.props.onInfobarTextChange} onSortSelect={this.props.onInfobarSortSelect} filters={this.props.infobarFilters}/>
        }
        {
          (data.products || []).map(function(product, i){
            return <ProductItem data={product} productsPerRow={that.props.productsPerRow} key={i}/>;
          })
        }
        {!this.props.loading && (data.products || []).length === 0 &&
          <div className="no-products-found" style={{textAlign: 'center', margin: 40}}>No Products Founds</div>
        }
        {this.props.loading &&
          <div className="products-loader" style={{textAlign: 'center', marginBottom: 40}}>
            <Loader visibility={true} />
          </div>
        }
      </div>
    );
  }
});

module.exports = ProductListing;
