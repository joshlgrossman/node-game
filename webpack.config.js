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
        include: [
          path.resolve(__dirname, 'app/')
        ],
        exclude: [
          /(node_modules|bower_components)/,
          path.resolve(__dirname,'app/server/')
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
    new HtmlWebpackPlugin({
      title: 'Game'
    })
  ]

};
