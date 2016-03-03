var bootstrapCSS = require("!style!css!sass!./bootstrap/bootstrap.scss");

const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('../node_modules/bootstrap/dist/js/bootstrap.min.js');

var subtitle = <span>The front end framework for an Indix experience</span>;

ReactDOM.render(subtitle, document.getElementById('subtitle'));
