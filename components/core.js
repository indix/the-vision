const tetherCSS = require('!style!css!../node_modules/tether/dist/css/tether.min.css');
const bootstrapCSS = require("!style!css!sass!./bootstrap/bootstrap.scss");

const React = require('react');
const ReactDOM = require('react-dom');

$ = window.jQuery = require('../node_modules/jquery/dist/jquery.min.js');
window.Tether = require('../node_modules/tether/dist/js/tether.min.js');
const bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.min.js');

var subtitle = <span>The front end framework for an Indix experience</span>;

ReactDOM.render(subtitle, $('#subtitle')[0]);
