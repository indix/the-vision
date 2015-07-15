'use strict';

// String Utilities
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.trunc = function(n,useWordBoundary){
  var tooLong = this.length > n,
    s_ = tooLong ? this.substr(0,n-1) : this.toString();
  s_ = useWordBoundary && tooLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
  return  tooLong ? s_ + '&hellip;' : s_;
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalizeLine = function() {
  var words = this.split(' ');
  for(var i in words)
    words[i] = words[i].capitalize();
  return words.join(' ');
};

String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};
