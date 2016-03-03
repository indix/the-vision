var path = require("path");

module.exports = {
  entry: './components/core.js',
  output: {
    filename: './dist/indix-ui.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=react" },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=./public/[hash].[ext]' }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json']
  }
};
