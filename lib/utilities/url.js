'use strict';

var urlUtil = {
  getParametersFromUrl: function(urlPath, mergeFunction){
    if(!urlPath) return {};
    if(typeof(mergeFunction) !== 'function')
      mergeFunction = function(oldVal, newVal)  {
        if (oldVal instanceof Array){ oldVal.push(newVal); return oldVal; } else { return [oldVal, newVal]; }
      };
    if(urlPath.indexOf('?') !== -1)
      urlPath = urlPath.substr(urlPath.indexOf('?') + 1);
    var params = {},
        all = urlPath.split('&');
    for(var i in all){
      var parameter = all[i].split('='),
          key = parameter[0],
          value = parameter[1];
      if(value.indexOf('{') === 0)
        value = JSON.parse(decodeURIComponent(value).replace(/&/g,'%26'));

      if(key){
        if(params[key])
            params[key] = mergeFunction(params[key], value);
        else
          params[key] = value;
      }
    }

    return params;
  },

  getRootFromUrl: function(urlPath){
    if(urlPath.indexOf('?') !== -1)
      urlPath = urlPath.substr(0, urlPath.indexOf('?'));
    return urlPath;
  },

  getParameterByName: function(terms, query){
    if(!query)
      return '';
    query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = query + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(terms);
    if(results === null)
      return null;
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  getContextAsUrlParams: function(context){
    //Need to write this and override $.param (" " to "+" issue)
    var url = [];

    for(var key in context){
      var value = context[key];
      if(value !== undefined && value !== null){
        if(typeof value === "string")
          url.push(key + '=' + value);
        else if(value instanceof Array)
          for(var j in value)
            url.push(key + encodeURI('[]=') + value[j]);
        else
          url.push(key + '=' + JSON.stringify(value));
      }
    }

    return url.join('&');

  }
};

module.exports = urlUtil;
