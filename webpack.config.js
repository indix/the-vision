var path = require('path');
var webpack = require('webpack');
var dist = process.argv.indexOf('--dist') !== -1;
var entry;

if(dist) {
  entry = {
    'dist/ix-components': './components/index.js',
    'dist/ix-components.min': './components/index.js',
  }
} else {
  entry = {
    'source/javascripts/main': './source/javascripts/_source.js',
  }
}

module.exports = {
  entry: entry,
  output: {
    path: './',
    filename: '[name].js',
    library: 'indix',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=./public/[hash].[ext]' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader?name=./public/images/[hash].[ext]' },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: { warnings: false }
    })
  ],
};
