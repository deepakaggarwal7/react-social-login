var webpack = require('webpack');
//import webpack from 'webpack';

module.exports = {
  entry: './src/index.js',
  externals:{
    "react": "umd react"
  },
  output: { path: __dirname + '/dist', filename: 'social-login.js', libraryTarget: 'umd' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
