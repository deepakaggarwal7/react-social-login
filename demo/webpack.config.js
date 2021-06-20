const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          ['env', {
            targets: {
              browsers: ['> 5%'],
              node: 6,
              forceAllTransforms: process.env.NODE_ENV === 'production' // Fixes UglifyJS errors with ES6 syntax
            }
          }]
        ],
        plugins: [
          'transform-inline-environment-variables',
          'transform-object-rest-spread',
          'transform-class-properties'
        ]
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin()
  ]
}
