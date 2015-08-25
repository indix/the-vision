'use strict';

var $ = require('jquery');
var _ = require('underscore');

var generalUtil = {
  compactObject: function(object){
    var o = _.clone(object);
    _.each(o, function(v, k){
      if(!v)
        delete o[k];
    });
    return o;
  },

  getRange: function(a){
    var min,
        max;

    $(a).each(function(index, number){
      if(typeof min === 'undefined'){
        min = number;
      }
      if(typeof max === 'undefined'){
        max = number;
      }
      min = number < min ? number : min;
      max = number > max ? number : max;
    });

    return {
      min: min,
      max: max
    };
  },


  // 21 Dec, 2013
  getInDateFormat: function(date){
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dateObj = new Date(date);

    return dateObj.getDate() + " " + months[dateObj.getMonth()] + ", " + dateObj.getFullYear();
  },

  toBCS: function(o){
    var s = [];
    s.push(typeof o.brand !== 'undefined' ? o.brand : 'All');
    s.push(typeof o.category !== 'undefined' ? o.category : 'Products');
    s.push(typeof o.store !== 'undefined' ? 'in ' + o.store : null);
    return s.join(' ');
  },

  constructCategoryPath: function(idPath, namePath){
    idPath = idPath || '';
    namePath = namePath || '';
    var parents = [{
      name: 'All Categories',
      id: -1
    }];
    var parentNames = namePath.split('>');
    idPath && idPath.split('>').forEach((id, i) => parents.push({
      id: +(id.trim()),
      name: (parentNames[i] || '').trim()
    }));
    return parents;
  },

};

module.exports = generalUtil;
