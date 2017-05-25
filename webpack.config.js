const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './app/client/src/client.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'app/client/build')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'app/client/src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-es2015', 'babel-preset-es2016']
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({
      title: 'Game'
    })
  ]

};
