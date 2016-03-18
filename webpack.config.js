var path = require("path");

module.exports = {
  entry: './components/core.js',
  output: {
    filename: './source/javascripts/indix-ui.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=react,presets[]=es2015" },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=./public/[hash].[ext]' },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader?name=./public/images/[hash].[ext]" }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json']
  }
};
