'use strict';

// var $ = require('jquery');
var numeral = require('numeral');
var currencyString = require('./currency-string');
var defaultCurrency = 'USD';

var formatUtil = {
  format: function(number, format){
    number = number || 0;
    if(format)
      return numeral(number).format(format);
    else if(Math.abs(number) > 9999)
      return numeral(number).format('0,0.[0]a');
    else if(Math.abs(number) > 999)
      return numeral(number).format('0,0.[00]');
    else
      return numeral(number).format('0.[00]');
  },

  unformat: function(value){
    if(isNaN(value))
      return numeral().unformat(value.toLowerCase());
    else
      return numeral().unformat(value);
  },

  formatPercentage: function(value){
    value = value || 0;
    return parseFloat(parseFloat(value).toFixed(2)) + '%';
  },

  formatCount: function(value){
    value = value || 0;
    var data = formatUtil.format(parseInt((value+'').split('.')[0], 10)) + '';
    data = data.indexOf('.') === -1 && isNaN(parseInt(data.substr(-1,1), 10)) ? data.splice(-1,0,'.0') : data;
    return data.toUpperCase();
  },

  formatCurrency: function(number){
    if(!number)
      number = 0;
    number = String(number);
    var currency = currencyString[defaultCurrency];

    console.log(number);
    if(isNaN(number[0])){
      currency = number[0];
      number = number.substring(1);
    }
    if(isNaN(number))
      number = '0';

    if(Math.abs(number) > 999999){
      number = numeral(number).format('0,0.[00]a').toUpperCase();
    }else{
      number = numeral(number).format('0,0.00');
    }
    return currency + number;
  },

  formatPrice: function(minPrice, maxPrice){
    var price = '-';
    if(minPrice && maxPrice && (minPrice !== maxPrice))
      price = formatUtil.formatCurrency(currencyString[defaultCurrency] + minPrice) + " - " + formatUtil.formatCurrency(currencyString[defaultCurrency] + maxPrice);
    else if(minPrice)
      price = formatUtil.formatCurrency(currencyString[defaultCurrency] + minPrice);
    else if(maxPrice)
      price = formatUtil.formatCurrency(currencyString[defaultCurrency] + maxPrice);
    return price;
  }
};

module.exports = formatUtil;
