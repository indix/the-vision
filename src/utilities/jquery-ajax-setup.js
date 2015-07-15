var $ = require('jquery');

$.ajaxSetup({
  cache: false,
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});
